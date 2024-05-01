namespace NotesAPI.Models.Entities
{
    public class Note
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = default!;
        public string Description { get; set; } = default!;
        public bool IsVisible { get; set; }
    }
}
