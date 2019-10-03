const List = require("../../../models/list");

const addListCode = async agent => {
  console.log("inetent triggerd: add list code");
  console.log(agent.parameters);
  const listCode = agent.parameters.seperateList;
  const list = await List.findOne({
    listCode: listCode.toLowerCase()
  });

  if (list) {
    // if channel code is matched to existing channel? need to check if findOne returns false if not
    const listName = list.name;
    const owner = list.owner;
    const subject = list.subject;
    const listId = list._id;

    agent.add(
      `Oke. ik heb Lijst: ${listName} van ${owner} gevonden, klopt dit?`
    );
    agent.context.set({
      name: "context-list-code",
      lifespan: 3,
      parameters: {
        listId,
        listName,
        subject,
        listCode
      }
    });
  } else {
    agent.add(`Ik heb hem niet kunnen vinden. Wat is de lijstcode?`);
  }
};

module.exports = {
  addListCode
};
