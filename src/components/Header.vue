<template>
  <div class="header">
    <div class="menu">
      <Icon @click.native="drawerOpened = true" type="ios-list" size="32" />
      <Drawer title="Basic Drawer" :closable="false" v-model="drawerOpened">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>

    <div class="user">
      
      <Dropdown>
        <a href="javascript:void(0)" style="color: #fff;">
          <!-- <Avatar icon="ios-person" /> -->     
          <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" style="margin-right: 5px;"/>
          管理员
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
            <DropdownItem>user1</DropdownItem>
            <DropdownItem disabled>user2</DropdownItem>
            <DropdownItem @click.native="logout">
              <Icon type="ios-log-out" size="20" />
              退出
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
    </div>
    <div class="info">
      <Badge dot :offset="[19,4]" :count="1">
        <Icon type="ios-notifications-outline" size="28" style="transform: rotate(30deg);"></Icon>
    </Badge>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      drawerOpened: false,
    }
  },
  methods: {
    logout() {
      this.$router.push('/')
    }
  },
}
</script>

<style>
.header {
  height: 45px;
  width: 100%;
  position: fixed;
  top: 0px;
  z-index:90;
  color: #fff;
  /* left: 145px; */
  line-height: 45px;
  background-color: rgb(53, 158, 226)
}
.header>div {
  float: right;

}
.header .menu {
  /* margin-right: 145px; */
  font-size: 20px;
  width: 54px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: #fff;
  background-color: #1f70a8;
}
.header .user {
  height: 30px;
  line-height: 30px;
  margin-top: 7px;
  padding-left: 10px;
  padding-right: 10px;
  border-left: 1px solid #1f71a8
}
.header .info {
  margin-right: 10px;
}
</style>
