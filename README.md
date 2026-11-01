# xchencs.github.io

陈翔（南通大学 人工智能与计算机学院）的个人主页与 smartSE 智能软件工程研究组站点。

版式参考 [ntdxyg.github.io](https://ntdxyg.github.io/)：衬线标题配无衬线正文，左侧简历式侧栏（照片、姓名、数据、联系方式），
顶部吸顶导航，Light / Dark 双配色，论文列表带 CCF 分区筛选，相册带灯箱。纯静态 HTML + 一份 CSS + 一份 JS，
不依赖任何框架和外部 CDN，可直接托管在 GitHub Pages。

## 页面

| 文件 | 内容 |
| --- | --- |
| `index.html` | 首页：研究兴趣、教育与工作经历、代表性成果、科研项目、学术服务、招生、联系方式 |
| `publications.html` | 论文与教材（274 条，按国际期刊 / 国际会议 / 国内一级学报 / 其他分组，可按 CCF 分区筛选） |
| `teaching.html` | 教学：主讲课程与课程资料 |
| `honors.html` | 个人荣誉、指导学生获奖与毕业论文 |
| `group/index.html` | 智能软件工程研究组简介与负责人介绍 |
| `group/member.html` | 团队成员（按入学年份分组，已毕业标注去向） |
| `group/picture.html` | 课题组相册 |
| `group/material.html`、`group/journal.html`、`group/book.html` | 资料、期刊会议、教材 |
| `algorithm.html`、`softwaretesting.html`、`advancedsoftwaretesting.html` | 课程页面 |
| `internal/main.html` | 课题组内部资料（`noindex`） |

英文版在 `en/` 目录下，页面一一对应（`en/index.html`、`en/publications.html`、`en/group/member.html` …），
顶栏的「中文 / EN」切换在两套页面之间互跳。英文版覆盖首页、论文、教学、荣誉摘要和课题组的全部页面；
`internal/` 没有英文版。论文列表两版各存一份（标题、作者本来就是英文），中文论文的中文标题保留原样。

## 修改内容

页面都是可以直接编辑的静态 HTML，改完保存、刷新即可，不需要构建。

- 侧栏（照片、数字、联系方式、招生卡片）在每页 `<aside class="sidebar">` 里，改一处记得同步其余页面（中英各一套）。
- 论文条目结构：`<li data-num="1" data-rank="a">` 内依次是 `.pub-title`、`.pub-authors`、`.pub-venue`、`.pub-extra`。
  `data-rank` 取 `a` / `b` / `c` / `other`，决定筛选归类；`data-num` 是序号，页面加载时会按可见条目自动重排。
  `publications.html` 与 `en/publications.html` 各存一份列表，改动时两边都要更新。
- 相册：`<figure><img src="…" alt="…" loading="lazy"><figcaption>说明</figcaption></figure>`，点击图片会放大。
- 新增页面时，记得在顶栏 `.controls` 里补上语言切换，并在 `<head>` 里写上 `hreflang` 互相指向。

## 样式与脚本

- `assets/style.css`：全部样式。颜色、字体、版心集中在 `:root`，深色模式只覆盖同名变量（`[data-theme="dark"]`）；
  文件末尾的 `@media print` 把页面排成 A4，用浏览器自带的打印（Ctrl+P / ⌘P）即可导出 PDF。
- `assets/site.js`：主题切换（记住选择，也支持 `?theme=dark` 直接预览）、侧栏本地时间、当前页导航高亮、
  论文分区筛选、相册灯箱、文献库检索。
- `assets/favicon.svg`：站点图标。

## 本地预览

```bash
python -m http.server 8000
# 打开 http://localhost:8000/
```

## 目录说明

```
assets/          样式、脚本、图标
en/              英文版页面
images/          个人照片与公众号二维码
group/picture/   课题组照片
paper/ awards/   论文与获奖 PDF
```

改版时的迁移脚本和旧页面快照已经删除；需要查看改版前的内容，可从 git 历史里取
（改版前最后一次提交是 `241fcea`，例如 `git show 241fcea:index.html`）。
