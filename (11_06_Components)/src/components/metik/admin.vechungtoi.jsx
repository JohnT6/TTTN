import React, { useCallback } from 'react';
import { usePuck } from '@puckeditor/core';
import { getTextStyle, getCustomRadius, getBackgroundStyle } from './admin.styleUtils';

const AdminVeChungToiMetik = ({
    title,
    titleConfig,
    textBlocks,
    videoUrl,
    videoRadius,
    background,
    layout = 'text_left',
    id,
}) => {
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
    } catch (e) {
        console.log(e);

    }

    const updateTextData = useCallback((index, newContent) => {
        if (!dispatch || !appState || !id) return;
        const newContentData = appState.data.content.map(item => {
            if (item.props?.id === id) {
                const newBlocks = [...(item.props.textBlocks || [])];
                if (newBlocks[index]) {
                    newBlocks[index] = { ...newBlocks[index], content: newContent };
                }
                return { ...item, props: { ...item.props, textBlocks: newBlocks } };
            }
            return item;
        });
        dispatch({ type: "set", state: { data: { ...appState.data, content: newContentData } } });
    }, [dispatch, appState, id]);

    return (
        <section className="py-12 md:py-20" style={getBackgroundStyle(background)}>
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">

                {/* Header Section */}
                <div className="mb-10 md:mb-16">
                    <div className="relative inline-block">
                        <h2
                            className="text-2xl md:text-3xl font-black text-[#2e7d32] uppercase tracking-wide relative z-10"
                            style={getTextStyle(titleConfig)}
                        >
                            {title}
                        </h2>
                        {/* Đường gạch dưới màu vàng */}
                        <div className="absolute bottom-1 left-0 w-[110%] h-3 z-0 -ml-2" style={{ backgroundColor: titleConfig?.bgColor || '#fbc02d' }}></div>
                    </div>
                </div>

                {/* Content Section */}
                <div className={`flex flex-col ${layout === 'video_left' ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-start`}>

                    {/* Cột trái: Văn bản */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        {(textBlocks || []).map((block, i) => (
                            <div
                                key={i}
                                className="text-gray-700 leading-relaxed text-base md:text-lg text-justify ck-content [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:font-bold [&_em]:italic"
                                style={getTextStyle(block.textConfig)}
                            >
                                {block.content}
                            </div>
                        ))}
                    </div>

                    {/* Cột phải: Video */}
                    <div className="w-full lg:w-1/2">
                        {videoUrl ? (
                            <video
                                src={videoUrl}
                                controls
                                className="w-full h-auto shadow-md"
                                style={{ borderRadius: getCustomRadius(videoRadius), backgroundColor: '#000' }}
                            >
                                Trình duyệt của bạn không hỗ trợ thẻ video.
                            </video>
                        ) : (
                            <div
                                className="w-full aspect-video bg-gray-200 flex items-center justify-center shadow-md"
                                style={{ borderRadius: getCustomRadius(videoRadius) }}
                            >
                                <span className="text-gray-500 font-medium">Chưa cung cấp đường dẫn (URL) Video</span>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </section>
    );
};

export default AdminVeChungToiMetik;
