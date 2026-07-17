const perksData = [
    {
        name: "wifi",
        label: "Wifi",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
            </svg>
        ),
    },
    {
        name: "park",
        label: "Free Parking",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
        ),
    },
    {
        name: "tv",
        label: "TV",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
        ),
    },
    {
        name: "radio",
        label: "Radio",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 7.5 16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0 0 12 6.75Z" />
            </svg>
        ),
    },
    {
        name: "pet",
        label: "Pets Allowed",
        icon: (
            <span className="text-xl">🐾</span>
        ),
    },
    {
        name: "entry",
        label: "Private Entrance",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
            </svg>
        ),
    },
];

export default function Perks({
    selected = [],
    onChange,
    variant = "display",
}) {

    const isForm = variant === "form";

    function handleCbClick(ev) {
        if (!onChange) return;

        const { checked, name } = ev.target;

        if (checked) {
            onChange([...selected, name]);
        } else {
            onChange(selected.filter(item => item !== name));
        }
    }

    const visiblePerks = isForm
        ? perksData
        : perksData.filter(perk => selected.includes(perk.name));

    return (
        <div
            className={
                isForm
                    ? "grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    : "grid gap-4 grid-cols-1 md:grid-cols-2"
            }
        >
            {visiblePerks.map((perk) => {

                const checked = selected.includes(perk.name);

                return (
                    <label
                        key={perk.name}
                        className={`
                            flex items-center gap-3 border transition-all
                            ${isForm ? "p-4 rounded-xl cursor-pointer" : "p-5 rounded-2xl"}
                            ${checked
                                ? "border-amber-500 bg-amber-50"
                                : "border-gray-200 bg-white"}
                            ${isForm ? "hover:border-amber-400 hover:shadow-sm" : ""}
                        `}
                    >
                        {isForm && (
                            <input
                                type="checkbox"
                                checked={checked}
                                name={perk.name}
                                onChange={handleCbClick}
                                className="hidden"
                            />
                        )}

                        <div className={isForm ? "w-5 h-5" : "w-6 h-6"}>
                            {perk.icon}
                        </div>

                        <span className={isForm ? "text-sm font-medium" : "font-medium"}>
                            {perk.label}
                        </span>
                    </label>
                );
            })}
        </div>
    );
}