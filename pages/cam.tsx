import type { NextPage } from "next";
import styles from "../styles/cam.module.css"
import { useEffect, useRef } from "react";

const CamPage: NextPage = () => {
    const videoRef = useRef(null)
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream: MediaStream) => {
            videoRef.current.srcObject = stream;
        })
    }, [])

    return <main className={styles.main}>
        <h1 className={styles.title}>집중이 풀리는 당신에게, 졸지마!</h1>
        <video autoPlay className={styles.video} ref={videoRef} />
    </main>
}

export default CamPage