/**
 * @author kunji
 * @file  音乐控制组件
 * @todo 
 * @date 2019/1/5
 */

var AudioMgr = {
    mute: -1, // 0没有静音，1为静音;
    musicPath: null,
    musicLoop: false,

    switchMusic: function(mute) {
        if(this.mute == mute) { // 状态没有改变;
            return;
        }

        this.mute = (mute) ? 1 : 0;
        if (this.mute === 1) { // 静音
            cc.audioEngine.stopMusic();
        }
        else {
            cc.audioEngine.playMusic(this.musicPath, this.musicLoop);
            cc.audioEngine.setMusicVolume(1);
        }
    }, 
    
    stopMusic: function() {
        cc.audioEngine.stopMusic();
        this.musicPath = null;
    }, 
    
    playMusic: function(filePath, loop) {
        cc.audioEngine.stopMusic(); 
        let url = cc.url.raw(filePath);
        this.musicPath = url; // 保存我们当前正在播放的背景音乐;
        this.musicLoop = loop;
        this.mute = 0;
        cc.audioEngine.playMusic(url, loop);
        cc.audioEngine.setMusicVolume(1);
    }, 
};

module.exports = AudioMgr;


