<template>
  <div class="wrapper">
    <div class="content">
      <div class="links-wrapper">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/" :class="navigationMenuTriggerStyle()">
                <div class="logo-wrapper">
                  <img src="@/assets/logo.svg" class="kopipes-logo" />
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink :class="navigationMenuTriggerStyle()" href="/job-listing">
                Jobs
              </NavigationMenuLink>
              <!-- <NavigationMenuLink :class="navigationMenuTriggerStyle()" href="/test">
                Test
              </NavigationMenuLink> -->
              <NavigationMenuLink :class="navigationMenuTriggerStyle()" href="/submit">
                Upload
              </NavigationMenuLink>
              <!-- <NavigationMenuLink :class="navigationMenuTriggerStyle()" href="/admin/dashboard">
                Admin Dashboard
              </NavigationMenuLink> -->
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div class="account-wrapper">
        <NavigationMenu v-if="userStore.email">
          <NavigationMenuList>
            <NavigationMenuItem>
              <!-- <NavigationMenuLink href="/profile" :class="navigationMenuTriggerStyle()">
                Hi, {{ userStore.email }}
              </NavigationMenuLink> -->
              <NavigationMenuTrigger> Hi, {{ userStore.email }} </NavigationMenuTrigger>
              <NavigationMenuContent class="navigation-content">
                <ul class="grid w-[218px] gap-3 p-4">
                  <li>
                    <NavigationMenuLink as-child>
                      <a
                        href="/profile"
                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div class="text-sm font-medium leading-none">Profile</div>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink as-child>
                      <a
                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div class="text-sm font-medium leading-none" @click="logout">Sign Out</div>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu v-else>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/login"
                :class="navigationMenuTriggerStyle()"
                class="login-btn"
              >
                Sign In
              </NavigationMenuLink>
              <NavigationMenuLink
                href="/signup"
                :class="navigationMenuTriggerStyle()"
                class="register-btn"
              >
                Join Now
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { useUserStore } from '@/stores/useUserStore'
import { onBeforeMount } from 'vue'
// import api from '@/api'

const userStore = useUserStore()

// const email = userStore.email
const userType = userStore.type

const logout = () => {
  localStorage.clear() // Clears all stored items
  window.location.href = '/' // Redirects to home page
}

// const fetchUserDetail = async () => {
//   try {
//     const response = await api.userDetail(email)
//     console.log('User detail fetched successfully!')
//     console.log('API Response:', response[0].type)
//     userType.value = response[0].type
//   } catch (error) {
//     console.error('Error:', error)
//   }
// }

onBeforeMount(() => {
  // fetchUserDetail()
  console.log('User Type:', userType)
})
</script>

<style scoped lang="scss">
.wrapper {
  height: 7.5vh;
  box-shadow:
    0 2px 2px rgba(0, 0, 0, 0.1),
    0 4px 4px rgba(0, 0, 0, 0.1);

  .content {
    margin: 0 3rem;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .links-wrapper {
      display: flex;
      gap: 2rem;
      align-items: center;

      .logo-wrapper {
        width: 3rem;
      }
    }

    .account-wrapper {
      display: flex;
      gap: 2rem;
      align-items: center;

      .login-btn {
        font-weight: 700;
      }

      .register-btn {
        border-radius: 25px;
        padding: 0.3rem 1rem;
        background-color: #000;
        color: #fff;
        font-weight: 700;
        cursor: pointer;
      }
    }
  }

  //   box-shadow: inset;
}
</style>
