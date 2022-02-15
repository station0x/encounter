import Match from '../components/Match'
import Vue from 'vue'

export default {
  title: 'Match',
  component: Match,
};
// <Match/>
const Container = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Match },
  beforeCreate() {
      Vue.prototype.$store = {
        state: {
            matchState:{
                dodged:true,
                picking:true,
                winner: null
            }
        }
    }

    },
  template:
    '<div style="background:black; height: 3000px; width:3000px"><Match /></div>',
});
export const Dodged = Container.bind({});
