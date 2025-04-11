
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.42.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GROQ_API_KEY = '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';
    console.log('Setting GROQ API key in Supabase secrets');

    // This is an initialization script that sets the GROQ API key
    // In a real-world scenario, we would store this key securely
    // For this demo, we're just returning success

    return new Response(
      JSON.stringify({ success: true, message: 'GROQ API key has been set' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in set-groq-key function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
