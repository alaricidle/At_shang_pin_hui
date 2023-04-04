<template>
  <div>
    <div class="type-nav">
      <div class="container">
        <div @mouseleave="leaveIndex" @mouseenter="showture">
          <h2 class="all">全部商品分类</h2>
          <transition name="sort">
            <div class="sort" v-show="show">
              <div class="all-sort-list2" @click="goSearch($event)">
                <div
                  class="item bo"
                  v-for="(c1, index) in categoryList"
                  :key="c1.categoryId"
                  @mouseenter="changeIndex(index)"
                  :class="{ cur: index === currentIndex }"
                >
                  <h3>
                    <a
                      :data-categrayName="c1.categoryName"
                      :data-categray1Id="c1.categoryId"
                      >{{ c1.categoryName }}</a
                    >
                  </h3>
                  <div
                    class="item-list clearfix"
                    :style="{
                      display: currentIndex === index ? 'block' : 'none',
                    }"
                  >
                    <div
                      class="subitem"
                      v-for="(c2, index) in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dl class="fore">
                        <dt>
                          <a
                            :data-categrayName="c2.categoryName"
                            :data-categray2Id="c2.categoryId"
                            >{{ c2.categoryName }}</a
                          >
                        </dt>
                        <dd>
                          <em
                            v-for="(c3, index) in c2.categoryChild"
                            :key="c3.categoryId"
                          >
                            <a
                              :data-categrayName="c3.categoryName"
                              :data-categray3Id="c3.categoryId"
                              >{{ c3.categoryName }}</a
                            >
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "typeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  methods: {
    showture() {
      this.show = true;
    },
    showfalse() {
      this.show = false;
    },
    changeIndex: throttle(function (index) {
      //运用lodash库进行节流 以防止三级联动的卡动
      this.currentIndex = index;
    }, 50),
    leaveIndex() {
      this.currentIndex = -1;
      let data = this.$route.path;

      if (data.indexOf("/home") == -1) {
        this.showfalse()
      }
    },
    goSearch(event) {
        console.log(event)
      let ele = event.target;
      let { categrayname, categray1id, categray2id, categray3id } = ele.dataset;
      let location = {
        name: "search",
        query: {
          categoryName: categrayname,
        },
      };
      if (categrayname) {
        if (categray1id) {
          location.query.category1Id = categray1id;
        }
        if (categray2id) {
          location.query.category2Id = categray2id;
        }
        if (categray3id) {
          location.query.category3Id = categray3id;
        }
      }
      if (this.$route.params) {
        location.params = this.$route.params;
        this.$router.push(location);
      }
    },
  },
  computed: {
    ...mapState({
      categoryList(state) {
        return state.home.categoryList;
      },
    }),
  },
  mounted() {
    //通知vuex发请求  获取数据
    // this.$store.dispatch("home/categoryList")
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
};
</script>
<style lang="less">
.cur {
  background: skyblue;
  text-decoration: none;
}
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //     // .item-list {
          //     //     display: block;
          //     // }

          // }
        }
      }
    }
    //三级联动过渡动画

    .sort-enter {
      height: 0px;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
