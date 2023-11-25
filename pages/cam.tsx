import type { NextPage } from "next";
import styles from "../styles/cam.module.css"
import { useState, useEffect, useRef } from "react";

const CamPage: NextPage = () => {
    // 몇 초마다 문구가 바뀔지 설정
    const TITLE_SWITCH_SECONDS = 10
    // 최상단에 뜨는 문구 (특정 초마다 갱신)
    const titleList = ["집중이 풀리는 당신에게, 졸지마!", "공부, 운전 등 집중해야 하는 당신!", "졸면 안 돼~ 졸면 안 돼~"]
    // 이미지 리스트
    const [imageList, setImageList] = useState<any[]>([])
    // 소요시간 (초)
    const [seconds, setSeconds] = useState<number>(0)
    // 타이머 재생 여부
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    // 타이머 Ref
    const timer = useRef(null)
    // 미디어 스트림
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)
    // 비디오 Ref
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

    const captureImage = () => {
        if (!mediaStream) return
        const track = mediaStream.getVideoTracks()[0]
        // @ts-ignore
        new ImageCapture(track).takePhoto().then((imageCapture) => {
            setImageList(
                (currentImageList) => [...currentImageList, URL.createObjectURL(imageCapture)]
            )
        })
    }


    useEffect(() => {
        // @ts-ignore
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream: MediaStream) => {
            // @ts-ignore
            videoRef.current.srcObject = stream
            setMediaStream(stream)
        })

        return () => {
            // @ts-ignore
            stopTimer()
        }
    }, [])

    return <main className={styles.main}>
        <h1 className={styles.title}>{titleList[Math.floor(seconds / TITLE_SWITCH_SECONDS) % titleList.length]}</h1>
        <h2>안자고 버틴 시간 {seconds}초 (0%)</h2>
        <video autoPlay className={styles.video} ref={videoRef} />
        <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={isPlaying ? pauseTimer : startTimer}>{isPlaying ? "멈추기" : seconds > 0 ? "다시 시작하기" : "시작하기"}</button>
            <button className={styles.button} onClick={captureImage}>캡처</button>
            <button className={styles.button} onClick={stopTimer}>끝내기</button>
        </div>
        <div className={styles.listContainer}>
            {imageList.map((imageItem)=><div className={styles.listItem}>
                <img src={imageItem} width="70px" height="70px"></img>
            </div>)}
        </div>
        {seconds > 0 && seconds < 5 ? <div className={styles.modal}>
            <div className={styles.modalContainer}>
                <p>카메라를 똑바로 봐주세요.</p>
                <p>잠시만 기다려주세요.</p>
                {/* <p>지금부터 시작합니다.</p> */}
            </div>
        </div> : null}
    </main>
}

export default CamPage