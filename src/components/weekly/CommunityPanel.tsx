"use client";

import { useCallback, useEffect, useState } from "react";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { Button, Column, Heading, Input, Row, Text } from "@once-ui-system/core";
import { isClerkConfigured } from "@/lib/clerk/config";
import styles from "./CommunityPanel.module.scss";

type CommunityQuestion = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  clerk_user_id: string;
  created_at: string;
};

type CommunityComment = {
  id: string;
  question_id: string;
  clerk_user_id: string;
  body: string;
  created_at: string;
};

type CommunityPanelProps = {
  locale?: "en" | "tr";
  labels: {
    title: string;
    askTitle: string;
    askBody: string;
    askTags: string;
    submit: string;
    signInPrompt: string;
    signInCta: string;
    empty: string;
    authNotReady: string;
    loading: string;
    comments: string;
    addComment: string;
    commentPlaceholder: string;
  };
};

function CommunityPanelInner({ locale = "en", labels }: CommunityPanelProps) {
  const { isSignedIn, isLoaded } = useAuth();
  const [questions, setQuestions] = useState<CommunityQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [commentsByQ, setCommentsByQ] = useState<Record<string, CommunityComment[]>>({});
  const [commentDraft, setCommentDraft] = useState("");
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  const loadQuestions = useCallback(() => {
    setLoading(true);
    fetch("/api/community/questions", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => setQuestions(data.questions ?? []))
      .catch(() => setQuestions([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const loadComments = useCallback(async (questionId: string) => {
    try {
      const res = await fetch(`/api/community/questions/${questionId}/comments`, { cache: "no-store" });
      const data = await res.json();
      setCommentsByQ((prev) => ({ ...prev, [questionId]: data.comments ?? [] }));
    } catch {
      setCommentsByQ((prev) => ({ ...prev, [questionId]: [] }));
    }
  }, []);

  const toggleComments = async (questionId: string) => {
    if (expandedId === questionId) {
      setExpandedId(null);
      return;
    }
    setExpandedId(questionId);
    setCommentDraft("");
    if (!commentsByQ[questionId]) {
      await loadComments(questionId);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isLoaded || !isSignedIn) {
      setError(labels.signInPrompt);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/community/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim(),
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.error === "auth_not_configured") setError(labels.authNotReady);
        else if (res.status === 401) setError(labels.signInPrompt);
        else if (data.error === "db_unavailable") {
          setError(locale === "tr" ? "Veritabanı hazır değil (migration + Supabase)." : "Database not ready (migration + Supabase).");
        } else setError(typeof data.error === "string" ? data.error : "Error");
        return;
      }
      setTitle("");
      setBody("");
      setTags("");
      loadQuestions();
    } catch {
      setError("Error");
    } finally {
      setSubmitting(false);
    }
  };

  const onCommentSubmit = async (questionId: string) => {
    setError(null);
    if (!isSignedIn) {
      setError(labels.signInPrompt);
      return;
    }
    const text = commentDraft.trim();
    if (!text) return;
    setCommentSubmitting(true);
    try {
      const res = await fetch(`/api/community/questions/${questionId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: text }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 401) setError(labels.signInPrompt);
        else setError(typeof data.error === "string" ? data.error : "Error");
        return;
      }
      setCommentDraft("");
      await loadComments(questionId);
    } catch {
      setError("Error");
    } finally {
      setCommentSubmitting(false);
    }
  };

  const signedIn = Boolean(isLoaded && isSignedIn);

  return (
    <Column
      fillWidth
      gap="m"
      className={styles.panel}
      padding="l"
      background="surface"
      border="neutral-alpha-weak"
      radius="m"
    >
      <Heading as="h2" variant="heading-strong-m">
        {labels.title}
      </Heading>

      {!signedIn && (
        <Row gap="12" vertical="center" wrap>
          <Text variant="body-default-s" onBackground="neutral-weak">
            {labels.signInPrompt}
          </Text>
          <SignInButton mode="modal">
            <Button size="s" variant="secondary">
              {labels.signInCta}
            </Button>
          </SignInButton>
        </Row>
      )}

      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          id="community-title"
          label={labels.askTitle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={!signedIn}
        />
        <label className={styles.textareaLabel} htmlFor="community-body">
          {labels.askBody}
          <textarea
            id="community-body"
            className={styles.textarea}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={4}
            disabled={!signedIn}
          />
        </label>
        <Input
          id="community-tags"
          label={labels.askTags}
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="javascript, react"
          disabled={!signedIn}
        />
        {error && (
          <Text variant="body-default-s" onBackground="danger-strong">
            {error}
          </Text>
        )}
        <Row>
          <Button
            type="submit"
            variant="primary"
            disabled={!signedIn || submitting || !title.trim() || !body.trim()}
          >
            {labels.submit}
          </Button>
        </Row>
      </form>

      <Column gap="s" fillWidth>
        {loading ? (
          <Text onBackground="neutral-weak">{labels.loading}</Text>
        ) : questions.length === 0 ? (
          <Text onBackground="neutral-weak">{labels.empty}</Text>
        ) : (
          questions.map((q) => (
            <div key={q.id} className={styles.question}>
              <Text variant="heading-default-s" weight="strong">
                {q.title}
              </Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {q.body}
              </Text>
              {q.tags?.length > 0 && (
                <Row gap="4" wrap>
                  {q.tags.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </Row>
              )}
              <Row gap="12" vertical="center" wrap>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  {new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
                    dateStyle: "medium",
                  }).format(new Date(q.created_at))}
                </Text>
                <button
                  type="button"
                  className={styles.commentToggle}
                  onClick={() => toggleComments(q.id)}
                >
                  {labels.comments}
                </button>
              </Row>

              {expandedId === q.id && (
                <Column gap="8" className={styles.comments}>
                  {(commentsByQ[q.id] ?? []).map((c) => (
                    <div key={c.id} className={styles.comment}>
                      <Text variant="body-default-s">{c.body}</Text>
                      <Text variant="label-default-s" onBackground="neutral-weak">
                        {new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
                          dateStyle: "medium",
                        }).format(new Date(c.created_at))}
                      </Text>
                    </div>
                  ))}
                  {signedIn ? (
                    <Row gap="8" vertical="end" fillWidth>
                      <textarea
                        className={styles.textarea}
                        rows={2}
                        value={commentDraft}
                        onChange={(e) => setCommentDraft(e.target.value)}
                        placeholder={labels.commentPlaceholder}
                      />
                      <Button
                        size="s"
                        variant="secondary"
                        disabled={commentSubmitting || !commentDraft.trim()}
                        onClick={() => onCommentSubmit(q.id)}
                      >
                        {labels.addComment}
                      </Button>
                    </Row>
                  ) : (
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {labels.signInPrompt}
                    </Text>
                  )}
                </Column>
              )}
            </div>
          ))
        )}
      </Column>
    </Column>
  );
}

function CommunityPanelFallback({ labels }: CommunityPanelProps) {
  return (
    <Column
      fillWidth
      gap="m"
      className={styles.panel}
      padding="l"
      background="surface"
      border="neutral-alpha-weak"
      radius="m"
    >
      <Heading as="h2" variant="heading-strong-m">
        {labels.title}
      </Heading>
      <Text variant="body-default-s" onBackground="neutral-weak">
        {labels.authNotReady}
      </Text>
    </Column>
  );
}

export default function CommunityPanel(props: CommunityPanelProps) {
  if (!isClerkConfigured()) {
    return <CommunityPanelFallback {...props} />;
  }
  return <CommunityPanelInner {...props} />;
}
