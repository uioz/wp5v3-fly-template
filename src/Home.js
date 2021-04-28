import { defineComponent } from "vue";
import {
  ElContainer,
  ElAside,
  ElMenu,
  ElSubmenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElHeader,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElMain,
  ElTable,
  ElTableColumn,
} from "element-plus";

export default defineComponent({
  name: "Home",
  components: {
    ElContainer,
    ElAside,
    ElMenu,
    ElSubmenu,
    ElMenuItemGroup,
    ElMenuItem,
    ElHeader,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElMain,
    ElTable,
    ElTableColumn,
  },
  setup() {
    return {
      message: "home page here",
      tableData: [
        {
          data: "test1",
          name: "test2",
          address: "test3",
        },
      ],
    };
  },
});
