import { getBackgroundStyle, getCustomRadius, getTitleStyle } from './admin.styleUtils';

const AdminHoiVien = ({
    background = {},
    title = {},
    logoRadius = {},
    logos = []
}) => {
    // Nhân bản danh sách logo để tạo vòng lặp cuộn vô tận liền mạch
    const duplicatedLogos = logos && logos.length > 0 ? [...logos, ...logos, ...logos, ...logos] : [];

    return (
        <section className="py-14 px-4 w-full overflow-hidden" style={getBackgroundStyle(background)}>
            {/* Nhúng mã CSS cho keyframes cuộn ngang vô tận */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scrollLogos {
                    0% {
                        transform: translate3d(0, 0, 0);
                    }
                    100% {
                        transform: translate3d(-50%, 0, 0);
                    }
                }
                .logo-scroll-track {
                    display: flex;
                    width: max-content;
                    animation: scrollLogos 25s linear infinite;
                }
                .logo-scroll-track:hover {
                    animation-play-state: paused;
                }
            `}} />

            <div className="max-w-7xl mx-auto">
                {title.text && (
                    <div className="text-center mb-12">
                        <h2
                            className="font-bold uppercase tracking-wide inline-block"
                            style={getTitleStyle(title)}
                        >
                            {title.text}
                        </h2>
                    </div>
                )}

                {logos && logos.length > 0 ? (
                    <div className="relative w-full overflow-hidden px-4">
                        {/* Hiệu ứng bóng mờ (Fade Mask) hai đầu trái phải giúp hiển thị cao cấp */}
                        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-linear-to-r from-sky-100/30 to-transparent z-10 pointer-events-none" />
                        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-linear-to-l from-sky-100/30 to-transparent z-10 pointer-events-none" />

                        {/* Băng chuyền Logo cuộn vô tận */}
                        <div className="logo-scroll-track gap-6 py-4">
                            {duplicatedLogos.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link || '#'}
                                    className="bg-white flex items-center justify-center p-5 w-44 sm:w-48 h-24 shadow-md border border-gray-100/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer shrink-0"
                                    style={{
                                        borderRadius: getCustomRadius(logoRadius)
                                    }}
                                >
                                    {item.logoUrl ? (
                                        <img
                                            src={item.logoUrl}
                                            alt={item.alt || 'Logo hội viên'}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    ) : (
                                        <span className="text-xs text-gray-400 font-semibold uppercase">Logo {(index % logos.length) + 1}</span>
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-400">
                        Chưa có logo hội viên nào được thêm. Hãy thêm trong mục cấu hình.
                    </div>
                )}
            </div>
        </section>
    );
};

export default AdminHoiVien;