import { useState, useEffect } from "react"

const Loading = () => {
    const [dots, setDots] = useState('');
    useEffect(() => {
        setInterval(() => {
            setDots(prev => {
                switch (prev) {
                    case "" :
                        return ".";
                    case "." :
                        return "..";
                    case ".." :
                        return "...";
                    case "..." :
                        return ""
                }
            })
        }, 1000)
    }, [])
    return <span>Loading{dots}</span>
}

export default Loading;