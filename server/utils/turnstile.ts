export async function verifyTurnstileToken(token: string | undefined, secretKey: string): Promise<boolean> {
    if (!token) {
        return false;
    }

    try {
        const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                secret: secretKey,
                response: token,
            }),
        });

        const data = await response.json();
        return data.success === true;
    }
    catch (error) {
        console.error('Turnstile verification error:', error);
        return false;
    }
}