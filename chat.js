export default async function handler(req, res) {

    // Only allow POST requests

    if (req.method !== "POST") {

        return res.status(405).json({
            error: "Method not allowed"
        });
    }


    try {

        const { message } = req.body;


        // Validate message

        if (
            !message ||
            typeof message !== "string"
        ) {

            return res.status(400).json({
                error: "Message is required"
            });
        }


        // Prevent unnecessarily huge requests

        if (message.length > 2000) {

            return res.status(400).json({
                error: "Message is too long"
            });
        }


        // Check that the secret exists

        if (!process.env.HF_TOKEN) {

            console.error(
                "HF_TOKEN environment variable is missing."
            );

            return res.status(500).json({
                error: "AI service is not configured"
            });
        }


        /*
            Hugging Face Inference Providers
            OpenAI-compatible API
        */

        const response = await fetch(
            "https://router.huggingface.co/v1/chat/completions",
            {

                method: "POST",

                headers: {

                    "Authorization":
                        `Bearer ${process.env.HF_TOKEN}`,

                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    model:
                        "openai/gpt-oss-120b:fastest",

                    messages: [

                        {
                            role: "system",

                            content:
                                "You are the official Sasta Ticket AI support assistant. Help users with ticket bookings, prices, events, cancellations, refunds, payments and general Sasta Ticket questions. Be friendly, concise and accurate. If you do not know something, say so instead of making up information."
                        },

                        {
                            role: "user",

                            content: message
                        }

                    ],

                    temperature: 0.4,

                    max_tokens: 300,

                    stream: false
                })
            }
        );


        const data =
            await response.json();


        /*
            Handle Hugging Face errors
        */

        if (!response.ok) {

            console.error(
                "Hugging Face error:",
                data
            );

            return res.status(502).json({
                error:
                    "AI service is temporarily unavailable"
            });
        }


        /*
            Get AI response
        */

        const reply =
            data?.choices?.[0]?.message?.content;


        if (!reply) {

            console.error(
                "Unexpected AI response:",
                data
            );

            return res.status(500).json({
                error:
                    "No response received from AI"
            });
        }


        /*
            Send response to frontend
        */

        return res.status(200).json({

            reply: reply.trim()

        });


    } catch (error) {

        console.error(
            "Server error:",
            error
        );


        return res.status(500).json({

            error:
                "Internal server error"

        });
    }
}