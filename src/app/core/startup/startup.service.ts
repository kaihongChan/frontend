import { Injectable, Inject, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { TranslateService } from '@ngx-translate/core';
import { I18NService } from '@core';
import { NzIconService } from 'ng-zorro-antd';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { Router } from '@angular/router';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private translate: TranslateService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    private httpClient: HttpClient,
    private injector: Injector,
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);

    // setting language data
    this.httpClient.get(`assets/tmp/i18n/${this.i18n.defaultLang}.json`).subscribe(langData => {
      this.translate.setTranslation(this.i18n.defaultLang, langData);
      this.translate.setDefaultLang(this.i18n.defaultLang);
    });
  }

  /**
   * 加载
   */
  load(): Promise<any> {
    return new Promise(resolve => {
      const tokenData = this.tokenService.get();
      if (!tokenData.token) {
        this.injector.get(Router).navigateByUrl('/passport/login');
        resolve({});
        return;
      }
      this.httpClient.get(`admin/initialization`).subscribe((response: any) => {
          const appData = response.data;
          this.settingService.setApp(appData);
          // ACL：设置权限为全量
          this.aclService.setFull(true);
          // 初始化菜单
          this.menuService.add([
            {
              text: '主导航',
              i18n: 'menu.main',
              group: true,
              children: [
                {
                  "text": "仪表盘",
                  "i18n": "menu.dashboard",
                  "icon": "anticon-dashboard",
                },
                {
                  "text": "报销管理",
                  // "i18n": "menu.shortcut",
                  "icon": "anticon-rocket",
                  "children": [
                    {
                      "text": "报销类型",
                      "link": "/reimbursement/type",
                      // "i18n": "menu.dashboard.v1"
                    },
                    {
                      "text": "报销项目",
                      "link": "/reimbursement/project",
                      // "i18n": "menu.dashboard.v1"
                    },
                    {
                      "text": "报销申请",
                      "link": "/reimbursement/apply",
                      // "i18n": "menu.dashboard.v1"
                    },
                    {
                      "text": "报销审核",
                      "link": "/reimbursement/check",
                      // "i18n": "menu.dashboard.v1"
                    },
                  ]
                },
                {
                  "text": "系统配置",
                  // "i18n": "menu.shortcut",
                  "icon": "anticon-rocket",
                  "children": [
                    {
                      "text": "组织机构",
                      "link": "/config/department",
                      // "i18n": "menu.dashboard.v1"
                    },
                    {
                      "text": "审核流程",
                      "link": "/config/workflow",
                      // "i18n": "menu.dashboard.v1"
                    },
                  ]
                },
                {
                  "text": "系统设置",
                  // "i18n": "menu.shortcut",
                  "icon": "anticon-rocket",
                  "children": [
                    {
                      "text": "系统权限",
                      "link": "/system/permission",
                      // "i18n": "menu.dashboard.v1"
                    },
                    {
                      "text": "权限策略",
                      "link": "/system/policy",
                      // "i18n": "menu.dashboard.v1"
                    },
                    {
                      "text": "系统菜单",
                      "link": "/system/menu",
                      // "i18n": "menu.dashboard.analysis"
                    },
                    {
                      "text": "系统角色",
                      "link": "/system/role",
                      // "i18n": "menu.dashboard.monitor"
                    },
                    {
                      "text": "系统用户",
                      "link": "/system/user",
                      // "i18n": "menu.dashboard.workplace"
                    }
                  ]
                },
              ],
            }
          ]);
          // 设置页面标题的后缀
          this.titleService.default = '';
          this.titleService.suffix = appData.name;

          resolve(null);
        },
        () => {
        },
        () => {
          resolve(null);
        });
    });
  }

}
