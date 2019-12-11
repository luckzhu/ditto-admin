

<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  //用 template 的话会多一层 div 
  render(h,context) {
    const { icon,title }=context.props
    const vNode=[]
    if(icon) {
      vNode.push(<svg-icon icon-name={icon} />)
    }
    if(title) {
      vNode.push(<span slot='title' >{(title)}</span>) //多看两遍
    }
    return vNode
  }
}
</script>
