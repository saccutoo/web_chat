
// @ts-nocheck
const videoAdapter=()=>{

    const openAudio=()=>{
        // var mp3=document.getElementById("player_noti_video_call");
        // mp3?.onplaying
        document.getElementById('player_noti_video_call')?.play();
    }

    const pauseAudio=()=>{
        // var mp3=document.getElementById("player_noti_video_call");
        // mp3?.onplaying
        document.getElementById('player_noti_video_call')?.pause();
    }
    return{
        openAudio,
        pauseAudio
    }
}
export default videoAdapter