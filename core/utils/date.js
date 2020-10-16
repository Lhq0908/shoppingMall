export default class {

    timestampToTime(timestamp) {
        if (timestamp.toString().length == 10) {
            timestamp = timestamp * 1000;
        }
        var date = new Date(timestamp);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y + M + D + h + m + s;
    }

    /**
     * 计算时间差
     * 返回 年 月 日
     */
    timeDiff(start, end) {
        // 开始时间
        let d1 = start.replace(/\-/g, "/");
        let date1 = new Date(d1);
        // 结束时间
        let d2 = end.replace(/\-/g, "/");
        let date2 = new Date(d2);
        // 时间相差秒数
        let dateDiff = date2.getTime() - date1.getTime();
        // 计算出相差天数
        let days = Math.floor(dateDiff / (24 * 3600 * 1000));
        // 计算出小时数
        let residue1 = dateDiff % (24 * 3600 * 1000);
        let hours = Math.floor(residue1 / (3600 * 1000));
        // 计算相差分钟数
        let residue2 = residue1 % (3600 * 1000);
        let minutes = Math.floor(residue2 / (60 * 1000));
        // 计算相差秒数
        let residue3 = residue2 % (60 * 1000);
        let seconds = Math.round(residue3 / 1000);

        let value = "";
        if (days != 0) {
            value += days + "天";
        }
        if (hours != 0) {
            value += hours + "小时";
        }
        if (minutes != 0) {
            value += minutes + "分";
        }
        if (seconds != 0) {
            value += seconds + "秒";
        }
        return value;
    }

}