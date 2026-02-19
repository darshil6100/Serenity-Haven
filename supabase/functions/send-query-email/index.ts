import "jsr:@supabase/functions-js/edge-runtime.d.ts";
/// <reference lib="deno.window" />
/// <reference lib="deno.ns" />

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface QueryData {
  name: string;
  email: string;
  phone: string;
  package_interest?: string;
  message: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const queryData: QueryData = await req.json();

    const emailBody = `
      <h2>New Query from Serenity Haven Website</h2>
      <p><strong>Name:</strong> ${queryData.name}</p>
      <p><strong>Email:</strong> ${queryData.email}</p>
      <p><strong>Phone:</strong> ${queryData.phone}</p>
      ${queryData.package_interest ? `<p><strong>Package Interest:</strong> ${queryData.package_interest}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${queryData.message}</p>
      <hr />
      <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
    `;

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!RESEND_API_KEY) {
      console.log("RESEND_API_KEY not configured. Query data:", queryData);
      return new Response(
        JSON.stringify({
          success: true,
          message: "Query received successfully. Email notification pending API key configuration."
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Serenity Haven <onboarding@resend.dev>",
        to: ["support@serenityhaven.in"],
        subject: `New Query from ${queryData.name}`,
        html: emailBody,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Failed to send email:", errorData);
      throw new Error("Failed to send email notification");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Query submitted and email sent successfully" }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error processing query:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "An error occurred"
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
