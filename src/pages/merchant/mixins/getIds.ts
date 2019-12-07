import { Component, Vue } from 'vue-property-decorator';

@Component
export default class GetIds extends Vue {
  get userInfo() {
    return this.$utils._Storage.get('user_info');
  }

  get uid() {
    return this.userInfo ? this.userInfo.id : '';
  }

  get shopid() {
    return this.userInfo ? this.userInfo.shopid : '';
  }

  mounted() {
    if (!this.userInfo) {
      this.$router.push('/login');
    }
  }
}
