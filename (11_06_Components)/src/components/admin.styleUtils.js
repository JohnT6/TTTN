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
    if (bg.type === "gradient") {
        return {
            background: `linear-gradient(${bg.gradientDirection || "to bottom right"}, ${bg.gradientFrom || "#667eea"}, ${bg.gradientTo || "#764ba2"})`,
        };
    }
    return { backgroundColor: bg.color || "#e6dcf7" };
};

// Hàm xử lý bo 4 góc
export const getCustomRadius = (radiusObj = {}) => {
    return `${radiusObj.tl || "0px"} ${radiusObj.tr || "0px"} ${radiusObj.br || "0px"} ${radiusObj.bl || "0px"}`;
};

// Hàm xử lý title
export const getTitleStyle = (titleConfig = {}) => {
    const bg = titleConfig.background || {};
    let style = { fontSize: titleConfig.size || "60px" };

    if (bg.type === "gradient") {
        style.backgroundImage = `linear-gradient(${bg.gradientDirection || "to right"}, ${bg.gradientFrom || "#fde047"}, ${bg.gradientTo || "#f59e0b"})`;
        style.WebkitBackgroundClip = "text";
        style.WebkitTextFillColor = "transparent";
    } else {
        style.color = bg.color || "#fde047";
    }
    return style;
};

// Hàm xử lý Button
export const getButtonStyle = (buttonConfig = {}) => {
    const bg = buttonConfig.background || {};
    const border = buttonConfig.border || {};
    let style = {
        color: buttonConfig.textColor || "#ffffff",
        fontSize: buttonConfig.textSize || "16px",
        borderRadius: getCustomRadius(buttonConfig.radius),
        borderStyle: border.style || "none",
        borderWidth: border.width || "0px",
        borderColor: border.color || "transparent",
    };

    if (bg.type === "gradient") {
        style.background = `linear-gradient(${bg.gradientDirection || "to right"}, ${bg.gradientFrom || "#3b82f6"}, ${bg.gradientTo || "#1e3a8a"})`;
    } else {
        style.background = bg.color || "#3b82f6";
    }

    return style;
};
