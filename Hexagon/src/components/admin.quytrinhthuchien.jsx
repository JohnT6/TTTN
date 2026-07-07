import React from 'react';
import { getBackgroundStyle, getTextStyle, getTitleStyle } from './admin.styleUtils';

const AdminQuyTrinhThucHien = ({
    sectionId = '',
    background,
    title = 'Quy trình thực hiện',
    titleConfig,
    subtitle = 'Quy trình chuyên nghiệp, minh bạch và hiệu quả.',
    subtitleConfig,
    items = []
}) => {
    return (
        <section id={sectionId || undefined} className="py-12 md:py-20 lg:py-24" style={getBackgroundStyle(background)}>
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="text-center mb-16">
                    <h2 
                        className="text-3xl lg:text-4xl font-bold mb-4"
                        style={getTitleStyle(titleConfig)}
                    >
                        {title}
                    </h2>
                    {subtitle && (
                        <div 
                            className="mt-2 max-w-2xl mx-auto ck-content [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:font-bold [&_em]:italic"
                            style={getTextStyle(subtitleConfig)}
                        >
                            {subtitle}
                        </div>
                    )}
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {items && items.map((item, index) => {
                        const stepNumber = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
                        return (
                            <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
                                <div 
                                    className="text-3xl font-bold mb-4"
                                    style={getTextStyle(item.numberConfig)}
                                >
                                    {item.customNumber || stepNumber}
                                </div>
                                <h4 
                                    className="font-bold mb-2 text-lg"
                                    style={getTextStyle(item.titleConfig)}
                                >
                                    {item.title}
                                </h4>

                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AdminQuyTrinhThucHien;
