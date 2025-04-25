type ApiConfigType = {
  [key: string]: {
    path: string;
    methods: "get" | "post";
  };
};
export const apiConfig: ApiConfigType = {
  createComment: {
    path: "/comment/createComment",
    methods: "post",
  },
  deleteComment: {
    path: "/comment/deleteComment",
    methods: "post",
  },
  getComments: {
    path: "/comment/top-level-comments",
    methods: "get",
  },
  randomImages: {
    path: '/randomImages',
    methods:'get'
  }
};
