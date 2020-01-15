<template>
  <div class="errPage-container flex-jc-ac">

    <el-row>
      <el-col :span="12"
              class="animation">
        <div>
          <el-button @click="back"
                     icon='el-icon-arrow-left'
                     size="small"
                     type="primary"
                     round>返回</el-button>
        </div>
        <h1 class="text-jumbo text-ginormous font-primary">ERROR!</h1>
        <p class="font-warning">暂无权限访问该页面，</p>
        <p class="font-warning font-16">请联系helpdesk@shencom.cn反馈意见。</p>
        <ul class="list-unstyled">
          <li class="font-info">或者你可以去:
            <el-button type="text"
                       @click="onGoHome">首页</el-button>

          </li>
          <li>
            <el-button type="text"
                       @click="changeImg">点我换图</el-button>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img src="assets/images/error/401.gif"
             width="313"
             height="428"
             alt="Girl has dropped her ice cream.">
      </el-col>

    </el-row>

  </div>
</template>

<script>
export default {
  name: 'page401',
  data() {
    return {
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
      dialogVisible: false,
    };
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.replace({ path: '/' });
      } else {
        this.$router.go(-1);
      }
    },
    onGoHome() {
      this.$router.replace({ path: '/' });
    },
    changeImg() {
      this.img = this.img === errGif ? this.ewizardClap : errGif;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.errPage-container {
  width: 100%;
  height: 100%;

  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .animation {
    opacity: 0;
    animation-name: slideUp;
    animation-duration: 0.5s;
    animation-delay: 0.3s;
    animation-fill-mode: forwards;
  }

  @keyframes slideUp {
    0% {
      transform: translateY(60px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
}
</style>
