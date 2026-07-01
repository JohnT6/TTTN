// Hàm xử lý background
export const getBackgroundStyle = (background = {}) => {
    const bg = background || {};
    if (bg.type === "image" && bg.imageUrl) {
        return {
            backgroundImage: `url('${bg.imageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        };
    }
    if (bg.type === "image_color" && bg.imageUrl) {
        return {
            backgroundImage: `url('${bg.imageUrl}')`,
            backgroundColor: bg.color || "#0B5077",
            backgroundBlendMode: "screen",
            backgroundSize: "cover",
            backgroundPosition: "center",
        };
    }
    if (bg.type === "image_gradient" && bg.imageUrl) {
        return {
            backgroundImage: `url('${bg.imageUrl}'), linear-gradient(${bg.gradientDirection || "to bottom right"}, ${bg.gradientFrom || "#0B5077"}, ${bg.gradientTo || "#a8dfff"})`,
            backgroundBlendMode: "screen",
            backgroundSize: "cover",
            backgroundPosition: "center",
        };
    }
    if (bg.type === "gradient") {
        return {
            background: `linear-gradient(${bg.gradientDirection || "to bottom right"}, ${bg.gradientFrom || "#0B5077"}, ${bg.gradientTo || "#a8dfff"})`,
        };
    }
    return { backgroundColor: bg.color || "#0B5077" };
};

// Hàm xử lý bo 4 góc
export const getCustomRadius = (radiusObj = {}) => {
    if (radiusObj.type === 'all') {
        return radiusObj.all || "0px";
    }
    return `${radiusObj.tl || "0px"} ${radiusObj.tr || "0px"} ${radiusObj.br || "0px"} ${radiusObj.bl || "0px"}`;
};

export const getResponsiveFontSize = (sizeString) => {
    if (!sizeString || typeof sizeString !== 'string') return sizeString;
    if (sizeString.endsWith('px')) {
        const maxPx = parseInt(sizeString, 10);
        if (isNaN(maxPx)) return sizeString;
        
        const minPx = Math.max(14, Math.floor(maxPx * 0.6));
        if (maxPx > minPx + 2) {
            const slope = (maxPx - minPx) / (1280 - 320);
            const yIntercept = minPx - slope * 320;
            const vwVal = (slope * 100).toFixed(2);
            const remVal = (yIntercept / 16).toFixed(4);
            return `clamp(${minPx}px, ${vwVal}vw + ${remVal}rem, ${maxPx}px)`;
        }
    }
    return sizeString;
};

export const getTextStyle = (config = {}) => {
    const style = {};
    if (config.color) style.color = config.color;
    if (config.size) style.fontSize = getResponsiveFontSize(config.size);
    if (config.weight) style.fontWeight = config.weight;
    if (config.style) style.fontStyle = config.style;
    if (config.decoration) style.textDecoration = config.decoration;
    return style;
};

// Hàm xử lý title
export const getTitleStyle = (titleConfig = {}) => {
    const bg = titleConfig.background || {};
    let style = { ...getTextStyle(titleConfig) };
    if (!style.fontSize) style.fontSize = getResponsiveFontSize("60px");

    if (bg.type === "gradient") {
        style.backgroundImage = `linear-gradient(${bg.gradientDirection || "to right"}, ${bg.gradientFrom || "#fde047"}, ${bg.gradientTo || "#f59e0b"})`;
        style.WebkitBackgroundClip = "text";
        style.WebkitTextFillColor = "transparent";
    } else {
        style.color = bg.color || titleConfig.color || "#fde047";
    }
    return style;
};

// Hàm xử lý Button
export const getButtonStyle = (buttonConfig = {}) => {
    const bg = buttonConfig.background || {};
    const border = buttonConfig.border || {};
    let style = {
        color: buttonConfig.textColor || "#ffffff",
        fontSize: getResponsiveFontSize(buttonConfig.textSize || "16px"),
        fontWeight: buttonConfig.weight || "bold",
        fontStyle: buttonConfig.style || "normal",
        textDecoration: buttonConfig.decoration || "none",
        borderRadius: getCustomRadius(buttonConfig.radius),
        borderStyle: border.style || "none",
        borderWidth: border.width || "0px",
        borderColor: border.color || "transparent",
    };

    if (bg.type === "gradient") {
        style.background = `linear-gradient(${bg.gradientDirection || "to right"}, ${bg.gradientFrom || "#fde047"}, ${bg.gradientTo || "#f59e0b"})`;
    } else {
        style.backgroundColor = bg.color || "#1e3a8a";
    }
    return style;
};

export const GRADIENT_DIRECTIONS = [
{ value: 'to right', label: 'Trái → Phải' },
{ value: 'to left', label: 'Phải → Trái' },
{ value: 'to bottom', label: 'Trên → Dưới' },
{ value: 'to bottom right', label: 'Góc trên-trái → dưới-phải' },
{ value: 'to bottom left', label: 'Góc trên-phải → dưới-trái' }
];