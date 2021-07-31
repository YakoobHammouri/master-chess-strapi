const masterChessPermissions = {
  accessMain: [
    { action: "plugins::master-chess.settings.read", subject: null },
  ],
  main: [{ action: "plugins::master-chess.read", subject: null }],
  create: [{ action: "plugins::master-chess.settings.create", subject: null }],
  delete: [{ action: "plugins::master-chess.settings.delete", subject: null }],
  update: [{ action: "plugins::master-chess.settings.update", subject: null }],
  read: [{ action: "plugins::master-chess.settings.read", subject: null }],
  settings: [{ action: "plugins::master-chess.settings.read", subject: null }],
};

export default masterChessPermissions;
