import { g, auth, config } from "@grafbase/sdk";

const User = g
  .model("User", {
    username: g.string().length({ min: 2, max: 40 }).optional(),
    email: g.string().unique(),
    password: g.string().optional(),
    avatarUrl: g.string().default(""),
    role: g.string().default("admin"), // admin customer poster accountant
    status: g.string().default("active"),
    // posts: g
    //   .relation(() => Post)
    //   .optional()
    //   .list()
    //   .optional(),
    // comments: g.relation(comment).optional().list().optional(),
  })
  .search()
  .auth((rules) => {
    rules.public().read();
  });

const Post = g
  .model("Post", {
    thumnail: g.string(),
    title: g.string(),
    content: g.string().optional(),
    author: g.relation(() => User).optional(),
    // slug: g.string().unique(),
    // publishedAt: g.datetime().optional(),
    // comments: g
    //   .relation(() => comment)
    //   .optional()
    //   .list()
    //   .optional(),
    // likes: g.int().default(0),
    // tags: g.string().optional().list().length({ max: 5 }),
  })
  .search();
// .search()
// .auth((rules) => {
//   rules.public().read();
//   rules.private().create().delete().update();
// });

// const comment = g.model("Comment", {
//   post: g.relation(post),
//   body: g.string(),
//   likes: g.int().default(0),
//   author: g.relation(() => user).optional(),
// });

const Otp = g
  .model("Otp", {
    code: g.string(),
    type: g.string(),
    verified: g.boolean().default(false),
    email: g.string(),
    expireAt: g.datetime(),
  })
  .search()
  .auth((rules) => {
    rules.public().read();
  });

const jwt = auth.JWT({
  issuer: "grafbase",
  secret: g.env("NEXTAUTH_SECRET"),
});

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private(),
  },
});
