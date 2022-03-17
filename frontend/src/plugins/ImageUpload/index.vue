<template>
  <div>
    <el-upload
      ref="upload"
      :class="{readonly: readonly,readonly1: fileList.length >= limit}"
      :list-type="listType"
      action
      accept="image/*"
      multiple
      :file-list="fileList"
      :http-request="upload"
      :before-upload="beforeUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
    >
      <!-- 默认显示按钮 根据参数显示其他的形态 -->
      <template v-if="listType === 'text'">
        <slot>
          <el-button type="primary">图片上传</el-button>
        </slot>
      </template>

      <template v-if="listType === 'picture-card'">
        <i slot="default" class="el-icon-plus" />
      </template>
    </el-upload>
    <el-progress v-show="isProgressShow" :percentage="percentage" />
    <!-- 图片预览 -->
    <el-image-viewer
      v-if="dialogVisible"
      :initial-index="initialIndex"
      :on-close="closeViewer"
      :url-list="previewList"
      :z-index="10000"
    />

    <el-dialog title="图片裁剪" class="cropper-dialog" top="5%" :visible.sync="cropperShow" @close="handleClose">
      <div class="cropper-content">
        <div class="cropper">
          <vueCropper
            ref="cropper"
            :img="clipperOption.img"
            :output-size="clipperOption.size"
            :output-type="clipperOption.outputType"
            :info="true"
            :auto-crop="clipperOption.autoCrop"
            :auto-crop-width="clipperOption.autoCropWidth"
            :auto-crop-height="clipperOption.autoCropHeight"
            :fixed-box="clipperOption.fixedBox"
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cropperShow = false">关闭</el-button>
        <el-button size="small" type="primary" @click="handleCropper">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getObjectURL } from '@/utils/fileHelper';
import { mapGetters } from 'vuex';
// 压缩插件
import ImageCompressor from 'image-compressor.js';
// 插件插件
import { VueCropper } from 'vue-cropper';

export default {
  components: {
    VueCropper
  },
  props: {
    // 展示的类型
    // text/picture/picture-card/
    listType: {
      type: String,
      default: 'text'
    },
    // 是否裁剪
    isClipper: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 9999
    },
    defaultImagesFileData: {
      type: Array,
      default: _ => []
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileList: [], // 列表展示数据
      fileData: [], // 传出去的数据
      dialogVisible: false,
      initialIndex: 0,
      previewList: [], // 预览图片数组
      cropperShow: false,
      // 图片裁剪参数
      clipperOption: {
        img: '', // 图片地址
        outputSize: 1, // 剪切后的图片质量（0.1-1）
        outputType: 'png',
        autoCrop: true,
        autoCropWidth: 375,
        autoCropHeight: 375,
        fixedBox: true
      },
      fileOption: {}, // 文件信息
      percentage: 0, // 进度信息
      isProgressShow: false
    };
  },
  computed: {
    ...mapGetters(['baseUrl'])
  },
  watch: {
    defaultImagesFileData(n, o) {
      this.dataInit(n)
      this.$emit('change', this.fileData);
    }
  },
  mounted() {
    this.dataInit(this.defaultImagesFileData);
  },
  methods: {
    dataInit(list) {
      const previewList = [];
      const defaultImages = JSON.parse(JSON.stringify(list));
      defaultImages.forEach(image => {
        image.url = this.baseUrl + image.fileUrl;
        previewList.push(image.url);
      });
      this.fileList = defaultImages || [];
      this.fileData = JSON.parse(JSON.stringify(list));
      this.previewList = previewList;
    },
    beforeUpload(file) {
      // 数量限制
      if (this.fileList.length >= this.limit) {
        this.$message.error('超出最大上传数量');
        this.fileList.pop();
        this.previewList.pop();
        return;
      }
    },
    upload(file) {
      if (this.fileList.length >= this.limit) {
        return
      }
      const originSize = file.file.size / 1024;
      const compressFile = file.file;
      if (originSize > 500) { // 大于500 自动压缩
        this.$refs.upload.uploadFiles.pop();// 调用内部组件的数组 解决裁剪时的显示问题
        this.imageCompress(compressFile).then(res => {
          if (this.isClipper) {
            this.imageClipper(res);
          } else {
            this.handleUpload(file);
          }
        })
      } else {
        this.$refs.upload.uploadFiles.pop();
        if (this.isClipper) { // 是否需要裁剪，不需要的话直接上传
          this.imageClipper(compressFile);
        } else {
          this.handleUpload(file);
        }
      }
    },
    // 上传操作
    handleUpload(file) {
      this.fileUpload(file.file).then(res => {
        this.fileList.push(res);
        this.previewList.push(getObjectURL(file.file));
        this.fileList.forEach(ele => {
          ele.name = ele.oldFileName;
          ele.url = `${this.baseUrl}${ele.fileUrl}`;
        })
        this.$emit('change', this.fileData);
      })
    },
    // 裁剪处理
    imageClipper(file) {
      this.cropperShow = true
      // 图片地址转换
      const url = getObjectURL(file);
      this.clipperOption.img = url;
      this.fileOption = {
        type: file.type,
        name: file.name
      };
    },
    // 压缩处理
    imageCompress(file) {
      return new Promise((resolve, reject) => {
        new ImageCompressor(file, {
          mimeType: 'image/jpeg',
          quality: 0.3, // 图片压缩的质量
          success(result) {
            resolve(result);
          },
          error(error) {
            reject(error);
            console.log(error);
          }
        });
      })
    },
    // 上传到服务器
    fileUpload(newFile) {
      return new Promise((resolve, reject) => {
        this.isProgressShow = true;
        const params = new FormData();
        params.append('catelog', newFile);
        this.$http({
          method: 'post',
          url: '/file/upload',
          headers: { 'Content-Type': 'multipart/form-data' },
          data: params,
          onUploadProgress: progressEvent => {
            let complete = (progressEvent.loaded / progressEvent.total * 100 | 0);
            this.percentage = complete;
          }
        })
          .then(res => {
            setTimeout(() => {
              this.isProgressShow = false;
              this.percentage = 0;
            }, 1500);
            if (res.status === '1') {
              const obj = res.obj[0];
              const fileObj = {
                cover: '',
                fileSize: obj.fileSize,
                fileType: 1,
                fileUrl: obj.fileUrl,
                newFileName: obj.newFileName,
                oldFileName: obj.oldFileName,
                relationId: null,
                mimeType: obj.mimeType,
                remark: '',
                sort: null,
				name: obj.oldFileName,
				url: obj.fileUrl
              };
              this.fileData.push(fileObj)
              resolve(fileObj)
            }
          })
          .catch(err => {
            reject(err)
            this.isProgressShow = false;
            this.percentage = 0;
            this.$message.error('上传图片异常：' + err);
            this.fileList.pop();
            this.previewList.pop();
          });
      })
    },
    handleRemove(file, fileList) {
      const index = this.fileList.findIndex(ele => ele.fileUrl === file.fileUrl);
      if (index !== -1) {
        this.fileList.splice(index, 1);
        this.previewList.splice(index, 1);
        this.fileData.splice(index, 1);
        this.$emit('change', this.fileData);
      }
    },
    // 确认裁剪
    handleCropper() {
      this.$refs.cropper.getCropBlob(result => {
        const url = window.URL.createObjectURL(result);
        const newFile = new File([result], this.fileOption.name, {
          type: this.fileOption.type
        });
        newFile.url = url;
        this.fileUpload(newFile).then(res => {
          this.previewList.push(url);
          // this.fileList = JSON.parse(JSON.stringify(this.fileData));
          this.fileList.push(res);
          this.fileList.forEach(ele => {
            ele.name = ele.oldFileName;
            ele.url = `${this.baseUrl}${ele.fileUrl}`;
          })
          this.cropperShow = false;
          this.$emit('change', this.fileData);
        })
      });
    },
    handleClose() {
      if (!this.fileData.length) {
        this.fileList.pop();
        this.previewList.pop();
      }
    },
    handlePreview(file) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].url === file.url) {
          this.initialIndex = i;
          break;
        }
      }
      this.dialogVisible = true;
    },
    closeViewer() {
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.cropper-dialog {
  ::v-deep.el-dialog__close {
    font-size: 20px;
    line-height: 1px;
  }
  ::v-deep.el-dialog__header {
    padding: 10px;
    border-bottom: 1px solid #e5e5e5;
  }
}
::v-deep.el-upload--picture-card {
  border: none;
}
::v-deep.el-upload-dragger {
  width: 146px;
  height: 146px;
  line-height: 146px;
}
::v-deep.el-upload-list__item,
::v-deep.el-upload--picture-card {
  width: 146px;
  height: 146px;
}
::v-deep.el-upload-list__item {
  i {
    font-size: 22px;
  }
}
::v-deep .el-upload-list__item.is-success .el-upload-list__item-status-label {
  display: none;
}
.readonly {
  ::v-deep .el-upload--picture-card {
    display: none;
  }
  ::v-deep .el-upload-list__item-actions {
    .el-upload-list__item-delete {
      display: none;
    }
  }
}
.readonly1 {
  ::v-deep .el-upload--picture-card {
    display: none;
  }
}
::v-deep .el-image-viewer__canvas {
  width: 50%;
  height: 50%;
  margin: 200px auto;
}
.cropper-content {
  padding: 0px 20px 20px;
  display: flex;
  justify-content: center;
  .cropper {
    width: 500px;
    height: 500px;
  }
  .show-preview {
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    .preview {
      overflow: hidden;
      border-radius: 50%;
      border: 1px solid #cccccc;
      background: #cccccc;
      margin-left: 40px;
    }
  }
}

@media screen and (max-width: 1919px) {
  ::v-deep .el-upload--picture-card {
    ::v-deep .el-upload-dragger {
      width: 86px;
      height: 86px;
      line-height: 86px;
    }
    ::v-deep .el-upload-list__item,
    ::v-deep .el-upload--picture-card {
      width: 86px;
      height: 86px;
      line-height: 86px;
    }
    ::v-deep .el-upload-list__item {
      i {
        font-size: 22px;
      }
    }
  }
}
</style>
