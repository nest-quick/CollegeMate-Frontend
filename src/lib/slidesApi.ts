//API call
export async function generateSlides(data: {title: string; slides: any[]}){
    const response = await fetch("/api/Slide/generate", {
        method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend response:", errorText);
        throw new Error("Failed to generate slides");
      }
    return response.json();
}