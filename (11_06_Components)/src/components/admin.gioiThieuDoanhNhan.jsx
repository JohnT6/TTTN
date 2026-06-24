import React from 'react';
import { usePuck } from '@measured/puck';
import { getBackgroundStyle, getTitleStyle, getTextStyle, getCustomRadius } from './admin.styleUtils';
import { Counter } from './admin.utils';
import { useInlineImage } from './admin.useInlineImage';

const AdminGioiThieuDoanhNhan = ({
    background = {},
    title = {},
    image = {},
    subtitle = {},
    paragraphs = [],
    quotes = [],
    stats = [],
    id
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
    } catch (e) {}

    const updateImageUrl = (editId, newUrl) => {
        if (!dispatch || !appState || !id) return;
        const newContent = appState.data.content.map(item => {
            if (item.props?.id === id) {
                return { ...item, props: { ...item.props, image: { ...item.props.image, url: newUrl } } };
            }
            return item;
        });
        dispatch({ type: "set", state: { data: { ...appState.data, content: newContent } } });
        if (appState.ui.itemSelector) {
            const currentSelector = { ...appState.ui.itemSelector };
            dispatch({ type: "setUi", ui: { itemSelector: null } });
            setTimeout(() => dispatch({ type: "setUi", ui: { itemSelector: currentSelector } }), 100);
        }
    };

    const { containerRef, getEditProps } = useInlineImage({ isEditing, onUpdate: updateImageUrl });

    return (
        <section ref={containerRef} className="relative w-full overflow-hidden text-sm lg:text-base py-10 md:py-16 px-4" style={{ ...getBackgroundStyle(background), minHeight: '600px' }}>
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-12 lg:gap-16">

                {/* Tiêu đề chính */}
                {title.text && (
                    <div className="flex flex-col items-center text-center">
                        <h2 className="mb-4" style={title.config ? getTextStyle(title.config) : { fontWeight: 'bold', fontSize: '32px', color: '#0368B0' }}>
                            {title.text}
                        </h2>
                        {/* Đường kẻ ngang */}
                        <div className="w-16 h-1 bg-[#F58220] rounded-full"></div>
                    </div>
                )}

                {/* Phần nội dung 2 cột */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-[50px] items-center">

                    {/* Cột trái: Hình ảnh */}
                    {image.url && (
                        <div className="flex-1 w-full flex justify-center items-center">
                            <img
                                {...getEditProps('image')}
                                src={image.url}
                                alt={image.alt || "Giới thiệu doanh nhân"}
                                className="w-full max-w-[500px] h-[300px] object-cover shadow-lg cursor-pointer transition-transform hover:scale-[1.02]"
                                style={{
                                    ...getEditProps('image').style,
                                    borderRadius: getCustomRadius(image.radius)
                                }}
                            />
                        </div>
                    )}

                    {/* Cột phải: Text và Trích dẫn */}
                    <div className="flex-1 w-full flex flex-col gap-6">

                        {/* Tiêu đề phụ */}
                        {subtitle.text && (
                            <h3 style={subtitle.config ? getTextStyle(subtitle.config) : { fontSize: '24px', fontWeight: 'bold', color: '#0368B0' }}>
                                {subtitle.text}
                            </h3>
                        )}

                        {/* Các đoạn văn bản */}
                        {paragraphs && paragraphs.length > 0 && (
                            <div className="flex flex-col gap-4">
                                {paragraphs.map((p, idx) => (
                                    <p key={idx} style={p.config ? getTextStyle(p.config) : { color: '#666' }}>
                                        {p.text}
                                    </p>
                                ))}
                            </div>
                        )}

                        {/* Khối trích dẫn (Tầm nhìn, Sứ mệnh...) */}
                        {quotes && quotes.length > 0 && (
                            <div className="mt-4 p-6 bg-gray-50 border-l-4 border-[#F58220] rounded-[10px] rounded-r-lg flex flex-col gap-4 shadow-sm">
                                {quotes.map((q, idx) => (
                                    <div key={idx} style={q.config ? getTextStyle(q.config) : { color: '#333' }}>
                                        <strong className="mr-2">{q.label}:</strong>
                                        <span>{q.text}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Khối thống kê (Hành trình) */}
                {stats && stats.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 mt-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-8 flex flex-col items-center text-center justify-center transition-transform hover:-translate-y-1">
                                <h4 className="mb-3" style={stat.numberConfig ? getTextStyle(stat.numberConfig) : { fontSize: '36px', fontWeight: 'bold', color: '#0368B0' }}>
                                    <Counter target={stat.number} />
                                    {stat.suffix}
                                </h4>
                                <p style={stat.labelConfig ? getTextStyle(stat.labelConfig) : { color: '#666', fontSize: '15px' }}>
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AdminGioiThieuDoanhNhan;
