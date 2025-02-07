import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma'; // Import the Prisma client

// Add this export to mark the route as dynamic
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    // Add timestamp to logs
    console.log('==== Webhook Request Started ====', new Date().toISOString());

    try {
        console.log('Webhook endpoint hit');

        // Get the headers
        const headerPayload = headers();
        const svix_id = headerPayload.get("svix-id");
        const svix_timestamp = headerPayload.get("svix-timestamp");
        const svix_signature = headerPayload.get("svix-signature");

        console.log('Headers received:', { svix_id, svix_timestamp, svix_signature });

        // If there are no headers, error out
        if (!svix_id || !svix_timestamp || !svix_signature) {
            console.error('Missing required Svix headers');
            return new Response('Error occurred -- no svix headers', {
                status: 400
            });
        }

        // Get the body
        const payload = await req.json();
        console.log('Received payload:', payload);
        const body = JSON.stringify(payload);

        // Create a new Svix instance with your webhook secret
        const webhookSecret = process.env.WEBHOOK_SECRET;
        console.log('Using webhook secret:', webhookSecret)
        const wh = new Webhook(webhookSecret || '');

        let evt: WebhookEvent;

        // Verify the payload
        try {
            evt = wh.verify(body, {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            }) as WebhookEvent;
            console.log('Webhook verified successfully'); // Log successful verification
        } catch (err) {
            console.error('Error verifying webhook:', err);
            return new Response('Error occurred during verification', {
                status: 400
            });
        }

        // Handle the webhook
        const eventType = evt.type;
        console.log('Processing event type:', eventType); // Log event type

        if (eventType === 'user.created') {
            const { id, email_addresses, first_name, last_name } = evt.data; // Destructure the necessary fields
            console.log('Processing user.created event');
            console.log('User ID:', id);
            console.log('Email addresses:', email_addresses);
            let full_name = first_name + " " + last_name;
            full_name = full_name.trim();
            // Create a new user in the database
            await prisma.user.create({
                data: {
                    id: id,
                    email: email_addresses[0].email_address,
                    name: full_name,
                    provider: email_addresses[0].verification?.strategy.toLowerCase().includes('facebook') ? 'FACEBOOK' : 'GOOGLE',
                },
            });
            console.log('User created in the database');
        }

        console.log('Webhook processed successfully'); // Log successful completion
        return new Response('Webhook processed successfully', {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('==== Webhook Error ====', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
