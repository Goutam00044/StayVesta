export default function ThingsToKnow({ extraInfo }) {

    if (!extraInfo?.trim()) {
        return null;
    }

    // Convert textarea into sections
    const sections = extraInfo
        .trim()
        .split(/\n\s*\n(?=\S)/)
        .map(section => {
            const lines = section.split("\n").filter(Boolean);

            return {
                title: lines[0],
                content: lines.slice(1).join("\n"),
            };
        });

    return (
        <section>
            <h2 className="text-2xl border-b py-4 border-gray-500 font-semibold mb-8">
                Things to know
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                {sections.map((section, index) => (
                    <div key={index}>
                        <h3 className="text-lg font-semibold mb-3">
                            {section.title}
                        </h3>

                        <p className="whitespace-pre-line text-gray-600 leading-7">
                            {section.content}
                        </p>
                    </div>
                ))}

            </div>

        </section>
    );
}