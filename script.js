
const API_KEY = "DEIN_API_KEY_HIER_EINFÜGEN";

async function sendMessage() {
    const prompt = document.getElementById("userInput").value;
    const output = document.getElementById("responseOutput");
    output.textContent = "Antwort wird geladen...";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "Du bist ein Kunstvermittler der Kunsthalle und beantwortest Fragen zu Caspar David Friedrichs 'Wanderer über dem Nebelmeer'.",
                    },
                    { role: "user", content: prompt },
                ],
                temperature: 0.7,
            }),
        });

        const data = await response.json();

        if (data.choices && data.choices.length > 0) {
            output.textContent = data.choices[0].message.content.trim();
        } else {
            output.textContent = "Fehler bei der Antwort.";
            console.error(data);
        }
    } catch (error) {
        output.textContent = "Fehler beim Abrufen der Antwort.";
        console.error(error);
    }
}
