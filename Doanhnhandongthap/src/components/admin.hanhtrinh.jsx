import React from 'react';
import { getBackgroundStyle, getTitleStyle, getTextStyle } from './admin.styleUtils';
import { Counter } from './admin.utils';

const AdminHanhTrinh = ({ background = {}, title = {}, items = [], alignItems = 'center' }) => {
    let containerJustify = 'justify-center';
    if (alignItems === 'left') containerJustify = 'justify-start';
    if (alignItems === 'right') containerJustify = 'justify-end';

    return (
        <section className="relative py-10 md:py-20 px-4 md:px-14 overflow-hidden" style={getBackgroundStyle(background)}>
            <div className="relative w-full max-w-7xl mx-auto z-10 flex flex-col items-center">
                
                {title?.text && (
                    <h2 className="mb-16 text-center" style={getTitleStyle(title)}>
                        {title.text}
                    </h2>
                )}

                <div className={`flex flex-wrap gap-8 w-full ${containerJustify}`}>
                    {items.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center px-4 flex-1 min-w-[240px] max-w-[300px]">
                            <h3 className="mb-4 flex items-center justify-center" style={getTextStyle(item.numberConfig)}>
                                <Counter target={item.numberValue} />
                                {item.suffix}
                            </h3>
                            <p style={{ ...getTextStyle(item.descConfig), whiteSpace: 'pre-wrap' }}>
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AdminHanhTrinh;
