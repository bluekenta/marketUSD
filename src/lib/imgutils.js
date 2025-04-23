
/**
uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        success: function(res) {
          if (res.tempFilePaths.length <= 0) return;
          uni.showLoading({ title: that.$t('上传中') });

          compress(res.tempFilePaths[0], { maxWidth: 720 }, val => {
            var accessToken = uni.getStorageSync('myToken');
            var account = uni.getStorageSync('account');
            var isFilePath = (val + '').indexOf('blob') > -1;
            uni.uploadFile({
              url: that.$api.globalData.url + 'api/vue/common/upload1',
              file: isFilePath ? null : val,
              filePath: isFilePath ? val : null,
              name: 'card',
              header: {
                token: accessToken,
                account: account
              },
		     success: function(uploadRes) {
                uni.hideLoading();
                if (uploadRes.statusCode == 200) {
                  let ras = JSON.parse(uploadRes.data);
                  if (ras.status === 1) {
                    uni.showToast({
                      title: that.$t(ras.msg),
                      duration: 2000
                    });
                    that.form[type] = ras.data;

 */

export function compress(fileObj,opts, callback) {
     if(!callback){
          callback=opts;
     }
	try {
		const image = new Image();
		if ((fileObj + "").indexOf("blob:") > -1) {
			image.src = fileObj;
		} else {
			image.src = URL.createObjectURL(fileObj);
		}
		image.onload = function() {
			const that = this;
			// 默认按比例压缩
			let w = that.width;
			let h = that.height;
			const scale = w / h;
			w = (fileObj.width || w) * 0.5;
               if(opts.maxWidth&&w>opts.maxWidth){
                    w=opts.maxWidth;
               }
			h = fileObj.height || w / scale;
			console.log("压缩", w, h);
			let quality = 0.7; // 默认图片质量为0.7
			// 生成canvas
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");
			// 创建属性节点
			const anw = document.createAttribute("width");
			anw.nodeValue = w;
			const anh = document.createAttribute("height");
			anh.nodeValue = h;
			canvas.setAttributeNode(anw);
			canvas.setAttributeNode(anh);
			ctx.drawImage(that, 0, 0, w, h);
			// 图像质量
			if (fileObj.quality && fileObj.quality <= 1 && fileObj.quality > 0) {
				quality = fileObj.quality;
			}
			// quality值越小，所绘制出的图像越模糊
			const data = canvas.toDataURL("image/jpeg", quality);
			// 压缩完成执行回调
			const newFile = convertBase64UrlToBlob(data);
			callback(newFile);
		};
	} catch (e) {
		console.log("压缩失败!", e);
          callback(fileObj)
	}
}

function convertBase64UrlToBlob(urlData) {
	const bytes = window.atob(urlData.split(",")[1]); // 去掉url的头，并转换为byte
	// 处理异常,将ascii码小于0的转换为大于0
	const ab = new ArrayBuffer(bytes.length);
	const ia = new Uint8Array(ab);
	for (let i = 0; i < bytes.length; i++) {
		ia[i] = bytes.charCodeAt(i);
	}
	return new Blob([ab], { type: "image/png" });
}
