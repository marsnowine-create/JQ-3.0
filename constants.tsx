
import { AgentRole, Agent } from './types';

export const AGENTS: Agent[] = [
  {
    id: AgentRole.POLYMATH,
    name: '景区百事通',
    tag: '全能助手',
    subTag: '靠谱服务',
    intro: '我可以解决景区内所有问题',
    greeting: '你好，我是景区总管 ✨',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    avatar: 'https://img.lenyiin.com/app/hide.php?key=Z3lHWUJ1M0w4aStUWTNCSUFGSVVmdmY3T1FpMWczSXpvZktvSVVBPQ==',
    presets: ['适合带小孩研学吗？', '只玩半天有哪些必玩景点', '讲解服务收费吗？']
  },
  {
    id: AgentRole.TOUR_GUIDE,
    name: '智能导览助手',
    tag: '伴游导览',
    subTag: '深度讲解',
    intro: '伴游地图导览，景区讲解服务，景点文化介绍',
    greeting: '跟我走，带你深度游览景区 🚩',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
    avatar: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=200&q=80',
    presets: ['开启伴游模式', '讲解一下这个景点', '有什么文化典故？']
  },
  {
    id: AgentRole.PATHFINDER,
    name: '景区引路人',
    tag: '智能避拥',
    subTag: '攻略达人',
    intro: '实时播报拥堵，规划最丝滑路径',
    greeting: '你好，我是你的专属引路人 🗺️',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    avatar: 'https://img.lenyiin.com/app/hide.php?key=L2NsWEpuQkNpSDluc2xJWXlYN0dDdmY3T1FpMWczSXpvZktvSVVBPQ==',
    presets: ['哪里人最少？', '帮我安排一个不累的路线', '现在有什么特色表演？']
  },
  {
    id: AgentRole.FACILITY,
    name: '服务设施助手',
    tag: '设施管家',
    subTag: '快人一步',
    intro: '极速定位洗手间、充电宝、母婴室',
    greeting: '想去哪？我为您指路 📍',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
    avatar: 'https://img.lenyiin.com/app/hide.php?key=azhhUXJWTnB6QSsvV1pXUi9Mc1pNL2Y3T1FpMWczSXpvZktvSVVBPQ==',
    presets: ['最近的厕所在哪？', '哪里可以租借轮椅？', '附近有免费直饮水吗？']
  },
  {
    id: AgentRole.PHOTO,
    name: '旅拍助手',
    tag: 'AI画师',
    subTag: '绝美打卡',
    intro: '帮您智能出片，让风景更懂你',
    greeting: '准备好留下最美回忆了吗？ 📸',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    avatar: 'https://img.lenyiin.com/app/hide.php?key=K1BNSUloR0dOcm9Ed0dKWFhwSVVTZmY3T1FpMWczSXpvZktvSVVBPQ==',
    presets: ['生成落日氛围感大片', '帮我修这张照片的背景', '推荐几个小众拍照点']
  },
  {
    id: AgentRole.EXPERT,
    name: '周边游玩专家',
    tag: '本地向导',
    subTag: '美食地道',
    intro: '推荐最有温度的周边美食与住宿',
    greeting: '玩累了？我带你吃点好的 🍲',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    avatar: 'https://picsum.photos/id/68/200/200',
    presets: ['附近最好吃的本地菜', '有推荐的高性价比民宿吗？', '这周边还有什么好玩的？']
  }
];
