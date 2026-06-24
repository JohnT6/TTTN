import React, { useState, useEffect } from 'react';

// Component đếm số chạy từ 0
export const Counter = ({ target }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const end = parseInt(target, 10);
        if (isNaN(end)) {
            setCount(target);
            return;
        }

        let start = 0;
        const duration = 2000; // 2 giây
        const stepTime = 30; // mỗi 30ms cập nhật 1 lần
        const totalSteps = duration / stepTime;
        const increment = end / totalSteps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [target]);

    if (isNaN(parseInt(target, 10))) {
        return <>{target}</>;
    }

    return <>{count.toLocaleString('vi-VN')}</>;
};
