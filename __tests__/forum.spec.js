const db = require('../config/postgresdb')
const Forum = require('../models/Forum');

describe('Forum model', () => {
  beforeAll(async () => {
    // Connect to the test database
    await db.connect();
  });

  afterAll(async () => {
    // Disconnect from the test database
    await db.end();
  });

  beforeEach(async () => {
    // Clear the forums table before each test
    await db.query('DELETE FROM forums');
    const data = {
        title: 'Test forum',
        content: 'This is a test forum',
      };
      forum = await Forum.create(data);
  });

  describe('create method', () => {
    it('should create a new forum', async () => {
      // Arrange
      const forumData = {
        title: 'Test forum',
        content: 'This is a test forum'
      };

      // Act
      const forum = await Forum.create(forumData);

      // Assert
      expect(forum).toBeInstanceOf(Forum);
      expect(forum.title).toBe('Test forum');
      expect(forum.content).toBe('This is a test forum');
      
    });
  });

  describe('getAll method', () => {
    it('should return an empty array if there are no forums', async () => {
      // Act
      const forums = await Forum.getAll();

      // Assert
      expect(forums).toEqual([]);
    });

    it('should return an array of forums if there are forums', async () => {
      // Arrange
      const forumData1 = {
        title: 'Test forum 1',
        content: 'This is a test forum 1'
       
      };
      const forumData2 = {
        title: 'Test forum 2',
        content: 'This is a test forum 2'
        
      };
      const forum1 = await Forum.create(forumData1);
      const forum2 = await Forum.create(forumData2);

      // Act
      const forums = await Forum.getAll();

      // Assert
      expect(forums).toEqual(expect.arrayContaining([forum1, forum2]));
    });
  });

  describe('getAllCreatedByUser method', () => {
    it('should return an empty array if the user has not created any forums', async () => {
      // Act
      const forums = await Forum.getAllCreatedByUser(1);

      // Assert
      expect(forums).toEqual([]);
    });

    it('should return an array of forums created by the user', async () => {
      // Arrange
      const forumData1 = {
        title: 'Test forum 1',
        content: 'This is a test forum 1',
        user_id: 1,
      };
      const forumData2 = {
        title: 'Test forum 2',
        content: 'This is a test forum 2',
        user_id: 2,
      };
      const forumData3 = {
        title: 'Test forum 3',
        content: 'This is a test forum 3',
        user_id: 1,
      };
      const forum1 = await Forum.create(forumData1);
      const forum2 = await Forum.create(forumData2);
      const forum3 = await Forum.create(forumData3);

      // Act
      const forums = await Forum.getAllCreatedByUser(1);

      // Assert
      expect(forums).toEqual(expect.arrayContaining([forum1, forum3]));
      expect(forums).not.toContain(forum2);
    });
  });

  describe('getOneById', () => {
    let forum;
  
    beforeAll(async () => {
      await db.connect();
      const data = {
        title: 'Test Title',
        content: 'Test Content',
        user_id: 1
      };
      forum = await Forum.create(data);
    });
  
    afterAll(async () => {
      await forum.destroy();
      await db.end();
    });
  
    it('returns a forum object when given a valid ID', async () => {
      const result = await Forum.getOneById(forum.id);
      expect(result).toBeInstanceOf(Forum);
      expect(result.id).toEqual(forum.id);
      expect(result.title).toEqual(forum.title);
      expect(result.content).toEqual(forum.content);
      expect(result.user_id).toEqual(forum.user_id);
    });
  
    it('returns null when given an invalid ID', async () => {
      const result = await Forum.getOneById(0);
      expect(result).toBeNull();
    });

    describe("save method", () => {
        it("should create a new forum if id is not set", async () => {
          const forum = new Forum({ title: "Test Forum", content: "Test content", user_id: 1 });
          const savedForum = await forum.save();
    
          expect(savedForum).toBeInstanceOf(Forum);
          expect(savedForum.id).toBe(1);
          expect(savedForum.title).toBe("Test Forum");
          expect(savedForum.content).toBe("Test content");
          expect(savedForum.user_id).toBe(1);
          expect(savedForum.created_at).toBeInstanceOf(Date);
          expect(savedForum.updated_at).toBeInstanceOf(Date);
        });
    
        it("should update an existing forum if id is set", async () => {
          const forum = new Forum({ title: "Test Forum", content: "Test content", user_id: 1 });
          const savedForum = await forum.save();
    
          expect(savedForum).toBeInstanceOf(Forum);
          expect(savedForum.id).toBe(1);
          expect(savedForum.title).toBe("Test Forum");
          expect(savedForum.content).toBe("Test content");
          expect(savedForum.user_id).toBe(1);
    
          savedForum.title = "Updated Forum Title";
          savedForum.content = "Updated Forum Content";
          const updatedForum = await savedForum.save();
    
          expect(updatedForum).toBeInstanceOf(Forum);
          expect(updatedForum.id).toBe(1);
          expect(updatedForum.title).toBe("Updated Forum Title");
          expect(updatedForum.content).toBe("Updated Forum Content");
          expect(updatedForum.user_id).toBe(1);
          expect(updatedForum.created_at).toBeInstanceOf(Date);
          expect(updatedForum.updated_at).toBeInstanceOf(Date);
          expect(updatedForum.created_at).toBe(savedForum.created_at);
          expect(updatedForum.updated_at).not.toBe(savedForum.updated_at);
        });
    })

    describe('destroy()', () => {
        it('should delete the forum from the database', async () => {
          // Call the destroy() method to delete the forum
          await forum.destroy();
    
          // Check if the forum was deleted from the database by trying to retrieve it
          const result = await Forum.getOneById(forum.id);
          expect(result).toBeNull();
        });
      });
})
})
