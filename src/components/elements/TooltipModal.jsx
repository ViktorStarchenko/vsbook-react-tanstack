import React, { useState } from 'react';

const TooltipModal = () => {
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleMouseEnter = (event) => {
        setModalPosition({ x: event.clientX, y: event.clientY });
        setIsModalVisible(true);
    };

    const handleMouseMove = (event) => {
        setModalPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseLeave = () => {
        setIsModalVisible(false);
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                display: 'inline-block',
                padding: '20px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ccc',
                cursor: 'pointer',
            }}
        >
            Наведите на меня
            {isModalVisible && (
                <div
                    style={{
                        position: 'absolute',
                        top: modalPosition.y - 30, // Сдвигаем окно выше курсора
                        left: modalPosition.x + 20, // Сдвигаем окно немного вправо
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        padding: '10px',
                        borderRadius: '5px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        pointerEvents: 'none', // Отключаем взаимодействие с окном
                    }}
                >
                    Это модальное окно
                </div>
            )}
        </div>
    );
};

export default TooltipModal;
