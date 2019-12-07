<template>

  <section v-if="item.children"
           class="menu-wrapper">
    <template v-if="hasOneShowingChild()">
      <a :href="onlyOneChild.path"
         target="_blank"
         @click="clickLink(onlyOneChild.path,$event)">
        <el-menu-item :index="(onlyOneChild.path||'')">
          <item :icon="onlyOneChild.icon"
                :title="onlyOneChild.name" />
        </el-menu-item>
      </a>
    </template>

    <el-submenu v-else
                :index="(item.id||'')">
      <template slot="title">
        <item :icon="item.icon"
              :title="item.name" />
      </template>
      <template v-for="child in item.children">
        <sidebar-item v-if="child.children&&child.children.length>0"
                      :is-nest="true"
                      :item="child"
                      :key="child.path"
                      :base-path="(child.path||'')"
                      class="nest-menu" />

        <a v-else
           :href="child.path"
           :key="child.path"
           target="_blank"
           @click="clickLink(child.path,$event)">
          <el-menu-item :index="(child.path||'')">
            <item :icon="child.icon"
                  :title="child.name" />
          </el-menu-item>
        </a>
      </template>
    </el-submenu>

  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Item from './item.vue';

interface menuChil {
  children?: Array<menuChil>;
  name?: string;
  icon?: string;
  id?: string;
  url?: string;
  path?: string;
  [index: string]: any;
}

@Component({ name: 'SidebarItem', components: { Item } })
export default class SidebarItem extends Vue {
  public onlyOneChild: menuChil = {};

  @Prop()
  private item!: menuChil;

  hasOneShowingChild(): boolean {
    const children: menuChil[] = this.item.children || [];
    const parent = this.item;

    if (children && children.length === 0) {
      this.onlyOneChild = parent;
      return true;
    }
    return false;
  }

  clickLink(routePath: string, e: Event) {
    const isExternalLink = this.$utils._ValidateURL(routePath);
    if (!isExternalLink) {
      e.preventDefault();
      this.$router.push(`${this.item.path}/${routePath}`);
    }
  }
}
</script>
