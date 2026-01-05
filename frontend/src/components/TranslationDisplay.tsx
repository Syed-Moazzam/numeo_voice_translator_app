import type { TranslationDisplayProps } from "../types";

export const TranslationDisplay = ({ translation }: TranslationDisplayProps) => {
    return (
        <div className="w-full max-w-3xl">
            <div className="bg-gray-800 backdrop-blur-sm rounded-2xl shadow-2xl p-8 min-h-70 border border-gray-700">
                <h2 className="text-2xl font-semibold mb-6 text-white flex items-center gap-3">Translation</h2>

                {translation ? (
                    <p className="text-gray-100 text-lg">{translation}</p>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                        <p className="text-gray-500 italic text-lg">
                            Your translations will appear here in real-time...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}