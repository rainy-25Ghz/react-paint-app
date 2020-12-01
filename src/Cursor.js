import { useState, useEffect, useContext } from "react";
import { CursorContext } from "./CursorContext";
//一个自定义的hook
export const useMousePosition = () => {
    const [pos, setPos] = useState({ clientX: 0, clientY: 0 });
    //更新位置的回调函数
    const updatePos = evt => {
        //相对屏幕→显示器的全屏的光标位置（screenX / Y）
        //浏览器视图坐标系的光标位置（client)
        //整个document中光标位置（page)一般有滚动效果的网页的document会比实际浏览器视图大
        const { pageX, pageY, clientX, clientY } = evt;
        setPos({
            clientX, clientY
        });//ES6解构赋值语法
    };
    useEffect((evt) => {
        //false是默认行为，阻止事件捕获
        //使用mouseenter不用mouseover的原因，见MDN两篇文章
        //https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event#Example
        //https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event
        document.addEventListener("mousemove", updatePos, false);//移动监听
        document.addEventListener("mouseenter", updatePos, false);//悬停监听
        return () => {
            //移除监听，防止内存泄漏
            document.removeEventListener("mouseenter", updatePos);
            document.removeEventListener("mousemove", updatePos);
        }
    }, []);//仅在 mount时运行1次副作用,并在unmount时清除
    return pos;
}
//自定义光标的图标
//光标组件实际是一个div里包一个svg
export const Cursor = () => {
    const [cursor] = useContext(CursorContext);
    const { clientX, clientY } = useMousePosition();
    const [visible, setVisible] = useState(false);//处理鼠标移出网页窗口的情况
    useEffect(() => {
        const handleEnter = () => { setVisible(true); };
        const handleLeave = () => { setVisible(false); };
        let root = document.getRootNode();
        root.addEventListener("mouseenter", handleEnter);
        root.addEventListener("mouseleave", handleLeave);
        return () => {
            root.removeEventListener("mouseenter", handleEnter);
            root.removeEventListener("mouseleave", handleLeave);
        }
    }, []);
    const pen = (
        <div
            style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9999,//始终浮在顶端
                pointerEvents: "none"//有个div在鼠标下会导致每次点击到的都是该div
            }}
        >
            <svg
                width={25}
                height={25}
                viewBox="0 0 25 25"
                style={{
                    position: "absolute",
                    left: clientX,
                    top: clientY,
                    //transform: "translate(-50%, -50%)",//使光标中心与图标对其
                }}
            >
                <path
                    d="M3.444 2.737l6.666 1.9.012.004.011.003C12.072 5.146 13.5 6.907 13.5 9c.003.503-.063.912-.211 1.367l-.185.58.43.43 1.865 1.866-2.12 2.121-1.848-1.847-.435-.435-.585.193c-.469.157-.891.228-1.411.225-2.171 0-3.985-1.539-4.407-3.586l-.008-.037-.01-.037-1.832-6.39 4.903 4.903C7.552 8.55 7.5 8.768 7.5 9c0 .828.672 1.5 1.5 1.5.828 0 1.5-.672 1.5-1.5 0-.828-.672-1.5-1.5-1.5-.232 0-.45.052-.647.146l-4.91-4.91zm9.834 14.041l3.536-3.535-2.572-2.572c.167-.527.258-1.089.258-1.671 0-2.56-1.748-4.71-4.115-5.324L1 1l2.613 9.116C4.13 12.618 6.345 14.5 9 14.5c.602 0 1.182-.097 1.724-.276l2.554 2.554z"
                    fillRule="nonzero"
                    fillOpacity="1"
                    fill="#000000"
                    stroke="none"
                    // TODO：此处需要对clientX进行额外检查
                    //因为mouseleave事件并非总是触发
                    //由其是缓慢退出浏览器左侧时
                    style={
                        {
                            opacity: clientX > 1 && visible ? 1 : 0,

                        }
                    }
                ></path>
            </svg>
        </div>
    );
    const non = (
        <div
            style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9999,//始终浮在顶端
                pointerEvents: "none"//有个div在鼠标下会导致每次点击到的都是该div
            }}
        >
            <svg
                width={25}
                height={25}
                viewBox="0 0 25 25"
                style={{
                    position: "absolute",
                    left: clientX,
                    top: clientY,
                    //transform: "translate(-50%, -50%)",//使光标中心与图标对其
                }}
            >
                <path
                    d="M14.872 8.859L3.646 2.072l-.98-.592.231 1.121 2.683 13 .243 1.178.664-1.003 3.038-4.59 5.22-1.417 1.127-.306-1-.604zM4.108 3.52l9.247 5.59-4.274 1.16-.182.05-.104.156-2.479 3.746L4.108 3.52z"
                    fillRule="nonzero"
                    fillOpacity="1"
                    fill="#000000"
                    stroke="none"
                    // TODO：此处需要对clientX进行额外检查
                    //因为mouseleave事件并非总是触发
                    //由其是缓慢退出浏览器左侧时
                    style={
                        {
                            opacity: clientX > 1 && visible ? 1 : 0,
                        }
                    }
                ></path>
            </svg>
        </div>
    );
    const pencil = (
        <div
            style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9999,//始终浮在顶端
                pointerEvents: "none"//有个div在鼠标下会导致每次点击到的都是该div
            }}
        >
            <svg
                width={25}
                height={25}
                viewBox="0 0 25 25"
                style={{
                    position: "absolute",
                    left: clientX,
                    top: clientY,
                    //transform: "translate(-50%, -50%)",//使光标中心与图标对其
                }}
            >
                <path
                    d="M7.313 16.431l10.82-10.82c.782-.782.782-2.048 0-2.829L16.72 1.368c-.781-.781-2.048-.781-2.829 0l-10.82 10.82-1.061 5.304 5.303-1.06zM12.235 4.44L3.992 12.68l-.707 3.536 3.535-.707 8.243-8.243-2.829-2.828zm.707-.707L15.77 6.56l1.657-1.657c.39-.39.39-1.023 0-1.414l-1.414-1.414c-.39-.39-1.024-.39-1.415 0l-1.657 1.657z"
                    fillRule="nonzero"
                    fillOpacity="1"
                    fill="#000000"
                    stroke="none"
                    // TODO：此处需要对clientX进行额外检查
                    //因为mouseleave事件并非总是触发
                    //由其是缓慢退出浏览器左侧时
                    style={
                        {
                            opacity: clientX > 1 && visible ? 1 : 0,
                        }
                    }
                ></path>
            </svg>
        </div>
    );
    return (<div>
        { cursor.isPen ? pen : cursor.isPencil ? pencil : non}
    </div>);
}


