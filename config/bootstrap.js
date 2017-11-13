/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = async (cb) => {
  //Neo4j driver
  const neo4j = require('neo4j-driver').v1;
  let uri = 'bolt://localhost:7687'
  const driver = neo4j.driver(uri, neo4j.auth.basic("neo4j", "asdfasdf"));
  
  const root_url = "http://www.google.com"
  const session = driver.session();
  await session.run(
    'CREATE (ee:Website {url: $url}) RETURN ee',
    { url: root_url }
  );

  //Crawl
  var Crawler = require("js-crawler");
  let crawler = new Crawler().configure({ depth: 5 });

  crawler.crawl(root_url, async (page) => {
      console.log("Crawled ==== ")
      console.log(page.referer);
      console.log(page.url);
      page.referer = page.referer ? page.referer : root_url
      console.log(page.referer);
      
      await session.run(
        'MATCH (rweb:Website) WHERE rweb.url = $ref ' +
        'CREATE (nweb:Website {url: $url}),' +
        '(rweb) - [:LINKS_TO] ->(nweb)',
        { url: page.url, ref: page.referer }
      );
      console.log(page.url);
    });
    
  session.close();
  driver.close();
  cb();
};
