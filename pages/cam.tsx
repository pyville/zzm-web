import type { NextPage } from "next";
import styles from "../styles/cam.module.css"
import { useState, useEffect, useRef } from "react";

const CamPage: NextPage = () => {
    const titleList = ["집중이 풀리는 당신에게, 졸지마!", "공부, 운전 등 집중해야 하는 당신!", "졸면 안 돼~ 졸면 안 돼~"]
    const [seconds, setSeconds] = useState<number>(0)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const timer = useRef(null)
    const videoRef = useRef(null)

    const incrementSeconds = () => {
        setSeconds((currentSeconds) => currentSeconds + 1)
    }

    const startTimer = () => {
        // @ts-ignore
        timer.current = setInterval(incrementSeconds, 1000)
        setIsPlaying(true)
    }

    const pauseTimer = () => {
        // @ts-ignore
        clearInterval(timer.current)
        setIsPlaying(false)
    }

    const stopTimer = () => {
        pauseTimer()
        setSeconds(0)
    }

    useEffect(() => {
        // @ts-ignore
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream: MediaStream) => {
            // @ts-ignore
            videoRef.current.srcObject = stream;
        })

        return () => {
            // @ts-ignore
            stopTimer()
        }
    }, [])

    return <main className={styles.main}>
        <h1 className={styles.title}>{titleList[Math.floor(seconds / 10) % titleList.length]}</h1>
        <h2>안자고 버틴 시간 {seconds}초 (0%)</h2>
        <video autoPlay className={styles.video} ref={videoRef} />
        <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={isPlaying ? pauseTimer : startTimer}>{isPlaying ? "멈추기" : seconds > 0 ? "다시 시작하기" : "시작하기"}</button>
        <button className={styles.button} onClick={stopTimer}>끝내기</button>
        </div>
    </main>
}

export default CamPage