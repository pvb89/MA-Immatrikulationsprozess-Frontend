export default {
makeToast(variant, title, msg) {
    return this.$bvToast.toast(msg, {
      title: title,
      variant: variant,
      solid: true,
      toaster: "b-toaster-bottom-center"
    });
  }
}