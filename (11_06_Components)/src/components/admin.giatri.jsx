import React, { useCallback } from 'react';
import { getBackgroundStyle, getTitleStyle, getTextStyle, getCustomRadius } from './admin.styleUtils';
import { usePuck } from '@measured/puck';
import { useInlineImage } from './admin.useInlineImage';

const AdminGiaTri = ({ id, background = {}, title = {}, button = {}, items = [], alignItems = 'center' }) => {
    let containerAlign = 'mx-auto';
    if (alignItems === 'left') containerAlign = 'mr-auto ml-0';
    if (alignItems === 'right') containerAlign = 'ml-auto mr-0';

    let dispatch = null;
    let appState = null;
    let isEditing = false;
    try {
        const puckContext = usePuck();
        if (puckContext && puckContext.dispatch) {
            dispatch = puckContext.dispatch;
            appState = puckContext.appState;
            isEditing = true;
        }
    } catch (e) {}

    const updateImageUrl = useCallback((editId, newUrl) => {
        if (!dispatch || !appState || !id) return;
        const itemIndex = parseInt(editId, 10);
        
        const newContent = appState.data.content.map(component => {
            if (component.props?.id === id) {
                const newItems = [...(component.props.items || [])];
                if (newItems[itemIndex]) {
                    newItems[itemIndex] = { ...newItems[itemIndex], imageUrl: newUrl };
                }
                return { ...component, props: { ...component.props, items: newItems } };
            }
            return component;
        });
        dispatch({ type: 'set', state: { ...appState, data: { ...appState.data, content: newContent } } });
    }, [dispatch, appState, id]);

    const { containerRef, getEditProps } = useInlineImage({
        isEditing,
        onUpdate: updateImageUrl
    });

    return (
        <section className="relative py-12 md:py-24 px-4 md:px-14 overflow-hidden" style={getBackgroundStyle(background)} ref={containerRef}>
            <div className="relative w-full max-w-7xl mx-auto z-10 flex flex-col">
                
                {/* Header: Title and Button */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 w-full">
                    <div className="flex-1">
                        {title?.text && (
                            <h2 className="text-left md:text-left text-center w-full" style={getTitleStyle(title)}>
                                {title.text}
                            </h2>
                        )}
                    </div>
                    
                    {button?.text && (
                        <div className="flex-none">
                            <a 
                                href={button.url || '#'} 
                                className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
                                style={getTextStyle(button.textConfig)}
                            >
                                {button.text} <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    )}
                </div>

                {/* Cards Container */}
                <div className={`flex flex-col lg:flex-row lg:flex-wrap justify-center gap-5 lg:gap-x-[35px] lg:gap-y-0 w-full lg:max-w-[485px] transition-all duration-300 lg:pb-[30px] ${containerAlign} pt-4 pb-12`}>
                    {items.map((item, index) => {
                        const isOddChild = index % 2 === 0; // index 0 is 1st child (odd)
                        const isRow2Plus = index >= 2;
                        
                        const transformClasses = isOddChild 
                            ? 'lg:translate-y-[30px] lg:hover:translate-y-[22px] hover:-translate-y-1'
                            : 'lg:translate-y-0 lg:hover:-translate-y-[8px] hover:-translate-y-1';
                        
                        const marginClasses = isRow2Plus ? 'lg:-mt-[15px]' : '';

                        return (
                            <div 
                                key={index} 
                                className={`relative w-full lg:w-[225px] h-auto lg:h-[300px] bg-white/50 backdrop-blur-md border border-white/80 pt-[30px] px-[22px] pb-[26px] flex flex-col items-center justify-start text-center shadow-[0_16px_40px_rgba(12,74,115,0.10)] transition-all duration-300 max-w-[320px] lg:max-w-none hover:bg-white/70 hover:shadow-[0_22px_52px_rgba(12,74,115,0.16)] ${transformClasses} ${marginClasses}`}
                                style={{
                                    borderRadius: getCustomRadius(item.radius)
                                }}
                            >
                                {item.imageUrl && (
                                    <div 
                                        className="w-[110px] h-[110px] rounded-full bg-white flex flex-shrink-0 items-center justify-center mb-[18px] shadow-[0_4px_20px_rgba(12,74,115,0.10)] overflow-hidden cursor-pointer"
                                        {...getEditProps(index)}
                                    >
                                        <img src={item.imageUrl} alt={item.title} className="w-[100px] h-[100px] object-contain" />
                                    </div>
                                )}
                                
                                {item.title && (
                                    <h4 className="mb-2" style={getTextStyle(item.titleConfig)}>
                                        {item.title}
                                    </h4>
                                )}
                                
                                {item.description && (
                                    <p style={{ ...getTextStyle(item.descConfig), whiteSpace: 'pre-wrap' }}>
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AdminGiaTri;
