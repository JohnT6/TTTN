import React from 'react';
import { AVAILABLE_LANGUAGES } from '../utils/langUtils';

export default function LanguageSwitcher({ currentLang, onLangChange, className = '' }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {AVAILABLE_LANGUAGES.map(lang => (
                <button
                    key={lang.code}
                    onClick={() => onLangChange(lang.code)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all border ${
                        currentLang === lang.code 
                            ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm' 
                            : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}
                    title={lang.label}
                >
                    <span className="text-xl leading-none">{lang.flag}</span>
                    <span className="text-sm font-bold uppercase">{lang.code}</span>
                </button>
            ))}
        </div>
    );
}
