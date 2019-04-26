import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ApplicationContextService } from './application-context.service';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private meta: Meta, private ctx: ApplicationContextService) { }
  public generateTags(config) {
    config = {
      title: "南方之诗",
      description: "这是某个人的博客，偶尔有一些和计算机有关的平凡文章，更新频率大概是一年一次。",
      image: "/assets/favicons/android-chrome-512x512.png",
      type: "website",
      ...config
    }

    this.meta.updateTag({ property: 'og:type', content: config.type });
    this.meta.updateTag({ property: 'og:site_name', content: '南方之诗' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image });
    this.meta.updateTag({ property: 'og:url', content: `https://${this.ctx.getValue<string>('server-name', 'localhost:4200')}/${config.post ?  `post/${config.post.postId}` : ""}` });
    this.meta.updateTag({ property: 'og:locale', content: 'zh_CN'});

    this.meta.updateTag({ name: 'description', content: config.describtion});

    if (config.post) {
      const post = config.post;

      const tags = post.tags || [];
      for (let t of tags) {
        this.meta.addTag({property: 'og:article:tags', content: t})
      }
      this.meta.addTag({name: 'keywords', content: tags.join(',')})

      if (post.publishTime) {
        this.meta.addTag({property: 'og:publish_time', content: post.publishTime.toString()});

      }
    }
  }
}
